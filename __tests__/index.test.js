import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (file) => path.join(`${__dirname}`, '__fixtures__', file);

const data = [
  ['before.json', 'after.json', 'default', 'result-json'],
  ['before.yml', 'after.yml', 'default', 'result-json'],
  ['before.ini', 'after.ini', 'default', 'result-json'],
  ['before-tree.json', 'after-tree.json', 'default', 'result-json-tree'],
  ['before-tree.yml', 'after-tree.yml', 'default', 'result-json-tree'],
  ['before-tree.ini', 'after-tree.ini', 'default', 'result-json-tree'],
  ['before-tree.json', 'after-tree.json', 'plain', 'result-json-plain'],
];

test.each(data)('genDiff(%s, %s, %s)', (before, after, format, result) => {
  const res = fs.readFileSync(getFixturePath(`${result}.txt`), 'utf-8');
  // console.log(before);
  // console.log(after);
  // console.log(result);
  expect(genDiff(before, after, format)).toEqual(res);
});
