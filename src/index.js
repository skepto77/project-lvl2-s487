import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getPath = (file) => path.join(__dirname, '..', '__tests__', '__fixtures__', file);

const genDiff = (file1, file2) => {
  const pathToFile1 = getPath(file1);
  const pathToFile2 = getPath(file2);

  const obj1 = JSON.parse(fs.readFileSync(pathToFile1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(pathToFile2, 'utf8'));
  // console.log(obj1);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = [...keys1, ...keys2]; // .sort()
  const result = keys.reduce((acc, item) => {
    let tmp = 0;
    if (_.has(obj1, item) && _.has(obj2, item) && obj2[item] === obj1[item]) {
      tmp = `  ${item}: ${obj1[item]}`;
    } else if (_.has(obj1, item) && _.has(obj2, item)) {
      tmp = `+ ${item}: ${obj2[item]}\n- ${item}: ${obj1[item]}`;
    } else if (_.has(obj2, item) && !_.has(obj1, item)) {
      tmp = `+ ${item}: ${obj2[item]}`;
    } else if (_.has(obj1, item) && !_.has(obj2, item)) {
      tmp = `- ${item}: ${obj1[item]}`;
    }
    return [...acc, tmp];
  }, []);

  return (`{\n${(_.uniq(result)).join('\n')}\n}`);
};

export default genDiff;
