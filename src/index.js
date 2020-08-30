import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parsers';

const getPath = (file) => path.join(__dirname, '..', '__tests__', '__fixtures__', file);

const getData = (file) => {
  const pathToFile = getPath(file);
  const extension = path.extname(pathToFile);
  return parser(extension, fs.readFileSync(pathToFile, 'utf-8'));
};

const types = [
  {
    check: (key, obj1, obj2) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    type: (key, obj1, obj2, makeDiff) => ({ type: 'parent', key, children: makeDiff(obj1[key], obj2[key]) }),
  },
  {
    check: (key, obj1, obj2) => !_.has(obj1, key) && _.has(obj2, key),
    type: (key, obj1, obj2) => ({ type: 'added', key, value: obj2[key] }),
  },
  {
    check: (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key),
    type: (key, obj1, obj2) => ({ type: 'deleted', key, value: obj1[key] }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    type: (key, obj1, obj2) => ({ type: 'unchanged', key, value: obj1[key] }),
  },
  {
    check: (key, objBefore, objAfter) => objBefore[key] !== objAfter[key],
    type: (key, obj1, obj2) => ({ type: 'changed', key, valueFirst: obj1[key], valueSecondary: obj2[key] }),
  },
];

const getType = (key, obj1, obj2) => types.find(({ check }) => check(key, obj1, obj2));

const makeDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).reduce((acc, key) => {
    const { type } = getType(key, obj1, obj2);
    return [...acc, type(key, obj1, obj2, makeDiff)];
  }, []);
  return keys;
};

const tab = (depth) => '  '.repeat(depth);

const stringify = (item, depth) => {
  if (!_.isObject(item)) {
    return `${item}`;
  }
  return `{\n${[...Object.keys(item)].map((key) => `${tab(depth + 3)}${key}: ${item[key]}`)}\n${tab(depth + 1)}}`;
};

const render = (ast, depth = 1) => {
  const mapped = ast.map((item) => {
    switch (item.type) {
      case 'parent':
        return `${tab(depth)}  ${item.key}: ${stringify(render(item.children, depth + 2))}`;
      case 'added':
        return `${tab(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
      case 'deleted':
        return `${tab(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
      case 'unchanged':
        return `${tab(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
      case 'changed':
        return `${tab(depth)}- ${item.key}: ${stringify(item.valueFirst, depth)}\n${tab(depth)}+ ${item.key}: ${stringify(item.valueSecondary, depth)}`;
      default:
        throw Error(`${item.type} is uncorrect`);
    }
  });
  return `{\n${mapped.join('\n')}\n${tab(depth - 1)}}`;
};

const genDiff = (file1, file2) => {
  const obj1 = getData(file1);
  const obj2 = getData(file2);
  const result = render(makeDiff(obj1, obj2));
  return result;
};

export default genDiff;
