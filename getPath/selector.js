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

const getPath = (node) => {
  if (!node) throw new InvalidArgumentException("The node doesn't exist.");

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

module.exports = {
  getPath,
  InvalidArgumentException,
};
