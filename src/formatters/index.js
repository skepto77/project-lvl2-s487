import stylish from './stylish';
import plain from './plain';
import json from './json';

const mapping = {
  stylish,
  plain,
  json,
};

export default (data, format = 'stylish') => mapping[format](data);
