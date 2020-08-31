#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const program = _commander.default;
program.version('0.0.1').arguments('<firstConfig> <secondConfig>').description('Compares two configuration files and shows a difference.').option('-f, --format [type]', 'Output format').action((firstConfig, secondConfig) => {
  console.log((0, _.default)(firstConfig, secondConfig, program.format));
}).parse(process.argv);