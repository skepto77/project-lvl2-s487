import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (file) => path.join(`${__dirname}`, '__fixtures__', file);

const result = fs.readFileSync(getFixturePath('result-json.txt'), 'utf-8');

const before = 'before.json';
const after = 'after.json';

test('json', () => {
  expect(genDiff(before, after)).toEqual(result);
});
