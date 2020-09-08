import _ from 'lodash';

const tab = (depth) => '  '.repeat(depth);

const stringify = (item, depth) => {
  if (!_.isObject(item)) {
    return `${item}`;
  }
  return `{\n${[...Object.keys(item)].map((key) => `${tab(depth + 3)}${key}: ${item[key]}`)}\n${tab(depth + 1)}}`;
};

const render = (ast, depth = 1) => {
  const mapped = ast.map((item) => {
    switch (item.type) {
      case 'parent':
        return `${tab(depth)}  ${item.key}: ${stringify(render(item.children, depth + 2))}`;
      case 'added':
        return `${tab(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
      case 'deleted':
        return `${tab(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
      case 'unchanged':
        return `${tab(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
      case 'changed':
        return `${tab(depth)}- ${item.key}: ${stringify(item.value1, depth)}\n${tab(depth)}+ ${item.key}: ${stringify(item.value2, depth)}`;
      default:
        throw Error(`${item.type} is uncorrect`);
    }
  });
  return `{\n${mapped.join('\n')}\n${tab(depth - 1)}}`;
};

export default render;
