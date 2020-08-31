import def from './default';
import plain from './plain';
import json from './json';

const mapping = {
  default: def,
  plain,
  json,
};

export default (data, format = 'default') => mapping[format](data);
