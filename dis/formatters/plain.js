"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stringify = value => _lodash.default.isObject(value) ? '[complex value]' : value;

const render = (ast, path = '') => {
  const result = ast.map(item => {
    switch (item.type) {
      case 'parent':
        return render(item.children.filter(element => element.type !== 'unchanged'), `${path}${item.key}.`);

      case 'added':
        return `Property ${path}${item.key} was added with value: ${stringify(item.value)}`;

      case 'deleted':
        return `Property ${path}${item.key} was removed`;

      case 'changed':
        return `Property ${path}${item.key} was updated. From ${stringify(item.valueFirst)} to ${stringify(item.valueSecondary)}`;

      default:
        throw Error(`${item.type} is uncorrect`);
    }
  });
  return result.join('\n');
};

var _default = render;
exports.default = _default;