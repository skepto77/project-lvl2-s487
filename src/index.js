import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers';
import render from './formatters';

const getData = (relativePath) => {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const extension = path.extname(absolutePath);
  return parse(extension, fs.readFileSync(absolutePath, 'utf-8'));
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
      type: 'changed', key, value1: obj1[key], value2: obj2[key],
    }),
  },
];

const getType = (key, obj1, obj2) => types.find(({ check }) => check(key, obj1, obj2));

const makeDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).map((key) => {
    const { type } = getType(key, obj1, obj2);
    return type(key, obj1, obj2, makeDiff);
  });
  return keys;
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const obj1 = getData(pathToFile1);
  const obj2 = getData(pathToFile2);
  const result = render(makeDiff(obj1, obj2), format);
  return result;
};

export default genDiff;
