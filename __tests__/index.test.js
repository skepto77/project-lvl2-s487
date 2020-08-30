import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (file) => path.join(`${__dirname}`, '__fixtures__', file);

const data = [
  ['before.json', 'after.json', ''],
  ['before.yml', 'after.yml', ''],
  ['before.ini', 'after.ini', ''],
  ['before-tree.json', 'after-tree.json', '-tree'],
  ['before-tree.yml', 'after-tree.yml', '-tree'],
  ['before-tree.ini', 'after-tree.ini', '-tree'],
];

test.each(data)('genDiff(%s, %s, %s)', (before, after, type) => {
  const result = fs.readFileSync(getFixturePath(`result-json${type}.txt`), 'utf-8');
  expect(genDiff(before, after)).toEqual(result);
});
