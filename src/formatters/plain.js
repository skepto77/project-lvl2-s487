import _ from 'lodash';

const stringify = (value) => ((_.isObject(value)) ? '[complex value]' : value);

const render = (ast, path = '') => {
  const result = ast.filter((item) => item.type !== 'unchanged')
    .map((item) => {
      switch (item.type) {
        case 'parent':
          return render(item.children, `${path}${item.key}.`);
        case 'added':
          return `Property ${path}${item.key} was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property ${path}${item.key} was removed`;
        case 'changed':
          return `Property ${path}${item.key} was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        default:
          throw Error(`${item.type} is uncorrect`);
      }
    });
  return result.join('\n');
};

export default render;
