import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (file) => path.join(`${__dirname}`, '__fixtures__', file);

const result = fs.readFileSync(getFixturePath('result-json.txt'), 'utf-8');

const data = [
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];

test.each(data)('genDiff(%s, %s)', (before, after) => {
  expect(genDiff(before, after)).toEqual(result);
});
