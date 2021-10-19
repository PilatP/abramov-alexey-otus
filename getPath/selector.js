class CustomException extends Error {
  constructor(type, message, ...params) {
    super(...params);

    this.name = type;
    this.message = message;
  }
}
class InvalidArgumentException extends CustomException {
  constructor(message, ...params) {
    super('InvalidArgumentException', message, params);
  }
}

const validateNode = (node) => {
  if (!node) throw new InvalidArgumentException("The node doesn't exist.");
};

/**
 * Реализация исключающая ошибки, связанные с повторением id
 * @param {*} node элемент DOM, для которого составляется селектор
 * @returns css селектор
 */
const getPathV1 = (node) => {
  validateNode(node);

  let currentNode = node;
  let nodes = [];
  while (currentNode && currentNode.nodeName.toLowerCase() !== 'body') {
    const relativeIndex =
      Array.from(currentNode.parentElement.children).findIndex(
        (node) => node === currentNode
      ) + 1;

    const currentNodePath = `${currentNode.nodeName.toLowerCase()}:nth-of-type(${relativeIndex})`;
    nodes.push(currentNodePath);
    currentNode = currentNode.parentElement;
  }
  return nodes.reverse().join(' ');
};

/**
 * Реализация формирующая селектор с использованием tag.class-name.
 * Если попадается заполненный id, тогда останавливаемся, исходя из того, что id элемента уникален.
 * @param {*} node элемент DOM, для которого составляется селектор node
 * @returns css селектор
 */
const getPathV2 = (node) => {
  validateNode(node);

  let currentNode = node;
  let nodes = [];
  const relativeIndex =
    Array.from(currentNode.parentElement.children).findIndex(
      (node) => node === currentNode
    ) + 1;
  while (currentNode && currentNode.nodeName.toLowerCase() !== 'body') {
    const id = currentNode.id;
    const classNames = currentNode.className?.split(' ').join('.');
    const currentNodePath = id
      ? `#${id}`
      : `${currentNode.nodeName.toLowerCase()}${
          classNames ? `.${classNames}` : ''
        }`;
    nodes.push(currentNodePath);
    if (id) break;
    currentNode = currentNode.parentElement;
  }
  return `${nodes.reverse().join(' ')}:nth-of-type(${relativeIndex})`;
};

module.exports = {
  getPathV1,
  getPath: getPathV2,
  InvalidArgumentException,
};
