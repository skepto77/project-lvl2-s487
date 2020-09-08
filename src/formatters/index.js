import common from './common';
import plain from './plain';
import json from './json';

const mapping = {
  common,
  plain,
  json,
};

export default (data, format = 'common') => mapping[format](data);
