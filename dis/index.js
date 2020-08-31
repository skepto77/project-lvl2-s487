"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _parsers = _interopRequireDefault(require("./parsers"));

var _formatters = _interopRequireDefault(require("./formatters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPath = file => _path.default.join(__dirname, '..', '__tests__', '__fixtures__', file);

const getData = file => {
  const pathToFile = getPath(file);

  const extension = _path.default.extname(pathToFile);

  return (0, _parsers.default)(extension, _fs.default.readFileSync(pathToFile, 'utf-8'));
};

const types = [{
  check: (key, obj1, obj2) => _lodash.default.isObject(obj1[key]) && _lodash.default.isObject(obj2[key]),
  type: (key, obj1, obj2, makeDiff) => ({
    type: 'parent',
    key,
    children: makeDiff(obj1[key], obj2[key])
  })
}, {
  check: (key, obj1, obj2) => !_lodash.default.has(obj1, key) && _lodash.default.has(obj2, key),
  type: (key, obj1, obj2) => ({
    type: 'added',
    key,
    value: obj2[key]
  })
}, {
  check: (key, obj1, obj2) => _lodash.default.has(obj1, key) && !_lodash.default.has(obj2, key),
  type: (key, obj1) => ({
    type: 'deleted',
    key,
    value: obj1[key]
  })
}, {
  check: (key, obj1, obj2) => obj1[key] === obj2[key],
  type: (key, obj1) => ({
    type: 'unchanged',
    key,
    value: obj1[key]
  })
}, {
  check: (key, objBefore, objAfter) => objBefore[key] !== objAfter[key],
  type: (key, obj1, obj2) => ({
    type: 'changed',
    key,
    valueFirst: obj1[key],
    valueSecondary: obj2[key]
  })
}];

const getType = (key, obj1, obj2) => types.find(({
  check
}) => check(key, obj1, obj2));

const makeDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keys = _lodash.default.union(keys1, keys2).reduce((acc, key) => {
    const {
      type
    } = getType(key, obj1, obj2);
    return [...acc, type(key, obj1, obj2, makeDiff)];
  }, []);

  return keys;
};

const genDiff = (file1, file2, format) => {
  const obj1 = getData(file1);
  const obj2 = getData(file2); //console.log(makeDiff(obj1, obj2));

  const result = (0, _formatters.default)(makeDiff(obj1, obj2), format); //console.log(result);

  return result;
};

var _default = genDiff;
exports.default = _default;