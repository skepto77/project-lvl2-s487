import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(`${__dirname}`, '__fixtures__', filename);

const data = [
  ['before.json', 'after.json', 'common', 'result'],
  ['before.yml', 'after.yml', 'common', 'result'],
  ['before.ini', 'after.ini', 'common', 'result'],
  ['before-tree.json', 'after-tree.json', 'common', 'result-tree'],
  ['before-tree.yml', 'after-tree.yml', 'common', 'result-tree'],
  ['before-tree.ini', 'after-tree.ini', 'common', 'result-tree'],
  ['before-tree.json', 'after-tree.json', 'plain', 'result-plain'],
  ['before-tree.json', 'after-tree.json', 'json', 'result-json'],
];

test.each(data)('genDiff(%s, %s, %s)', (before, after, format, result) => {
  const res = fs.readFileSync(getFixturePath(`${result}.txt`), 'utf-8');
  expect(genDiff(getFixturePath(before), getFixturePath(after), format)).toEqual(res);
});
