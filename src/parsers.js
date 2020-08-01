import yaml from 'js-yaml';

const format = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (extension, data) => format[extension](data);
