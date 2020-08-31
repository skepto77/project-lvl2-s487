"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _ini = _interopRequireDefault(require("ini"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapping = {
  '.json': JSON.parse,
  '.yml': _jsYaml.default.safeLoad,
  '.ini': _ini.default.parse
};

var _default = (extension, data) => mapping[extension](data);

exports.default = _default;