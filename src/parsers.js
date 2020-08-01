import yaml from 'js-yaml';
import ini from 'ini';

const format = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (extension, data) => format[extension](data);
