import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parsers';
import render from './formatters';

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
    type: (key, obj1) => ({ type: 'deleted', key, value: obj1[key] }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    type: (key, obj1) => ({ type: 'unchanged', key, value: obj1[key] }),
  },
  {
    check: (key, objBefore, objAfter) => objBefore[key] !== objAfter[key],
    type: (key, obj1, obj2) => ({
      type: 'changed', key, valueFirst: obj1[key], valueSecondary: obj2[key],
    }),
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

const genDiff = (file1, file2, format) => {
  const obj1 = getData(file1);
  const obj2 = getData(file2);
  //console.log(makeDiff(obj1, obj2));
  const result = render(makeDiff(obj1, obj2), format);
  //console.log(result);
  return result;
};

export default genDiff;
