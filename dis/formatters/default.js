"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tab = depth => '  '.repeat(depth);

const stringify = (item, depth) => {
  if (!_lodash.default.isObject(item)) {
    return `${item}`;
  }

  return `{\n${[...Object.keys(item)].map(key => `${tab(depth + 3)}${key}: ${item[key]}`)}\n${tab(depth + 1)}}`;
};

const render = (ast, depth = 1) => {
  const mapped = ast.map(item => {
    switch (item.type) {
      case 'parent':
        return `${tab(depth)}  ${item.key}: ${stringify(render(item.children, depth + 2))}`;

      case 'added':
        return `${tab(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;

      case 'deleted':
        return `${tab(depth)}- ${item.key}: ${stringify(item.value, depth)}`;

      case 'unchanged':
        return `${tab(depth)}  ${item.key}: ${stringify(item.value, depth)}`;

      case 'changed':
        return `${tab(depth)}- ${item.key}: ${stringify(item.valueFirst, depth)}\n${tab(depth)}+ ${item.key}: ${stringify(item.valueSecondary, depth)}`;

      default:
        throw Error(`${item.type} is uncorrect`);
    }
  });
  return `{\n${mapped.join('\n')}\n${tab(depth - 1)}}`;
};

var _default = render;
exports.default = _default;