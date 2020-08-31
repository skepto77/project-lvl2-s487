import _ from 'lodash';

const stringify = (value) => ((_.isObject(value)) ? '[complex value]' : value);

const render = (ast, path = '') => {
  const result = ast.map((item) => {
    switch (item.type) {
      case 'parent':
        return render(item.children.filter((element) => element.type !== 'unchanged'), `${path}${item.key}.`);
      case 'added':
        return `Property ${path}${item.key} was added with value: ${stringify(item.value)}`;
      case 'deleted':
        return `Property ${path}${item.key} was removed`;
      case 'changed':
        return `Property ${path}${item.key} was updated. From ${stringify(item.valueFirst)} to ${stringify(item.valueSecondary)}`;
      default:
        throw Error(`${item.type} is uncorrect`);
    }
  });
  return result.join('\n');
};

export default render;
