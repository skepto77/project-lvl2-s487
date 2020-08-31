import def from './default';
import plain from './plain';

const mapping = {
  default: def,
  plain,
};

export default (data, format = 'default') => mapping[format](data);
