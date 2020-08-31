import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (file) => path.join(`${__dirname}`, '__fixtures__', file);

const data = [
  ['before.json', 'after.json', 'default', 'result'],
  ['before.yml', 'after.yml', 'default', 'result'],
  ['before.ini', 'after.ini', 'default', 'result'],
  ['before-tree.json', 'after-tree.json', 'default', 'result-tree'],
  ['before-tree.yml', 'after-tree.yml', 'default', 'result-tree'],
  ['before-tree.ini', 'after-tree.ini', 'default', 'result-tree'],
  ['before-tree.json', 'after-tree.json', 'plain', 'result-plain'],
  ['before-tree.json', 'after-tree.json', 'json', 'result-json'],
];

test.each(data)('genDiff(%s, %s, %s)', (before, after, format, result) => {
  const res = fs.readFileSync(getFixturePath(`${result}.txt`), 'utf-8');
  // console.log(before);
  // console.log(after);
  // console.log(result);
  expect(genDiff(before, after, format)).toEqual(res);
});
