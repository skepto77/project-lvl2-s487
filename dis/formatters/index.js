"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default2 = _interopRequireDefault(require("./default"));

var _plain = _interopRequireDefault(require("./plain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapping = {
  default: _default2.default,
  plain: _plain.default
};

var _default = (data, format = 'default') => mapping[format](data);

exports.default = _default;