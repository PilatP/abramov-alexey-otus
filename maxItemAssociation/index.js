const data1 = [
  ['a', 'b'],
  ['a', 'c'],
  ['d', 'e'],
];
const data2 = [
  ['q', 'w', 'a'],
  ['a', 'b'],
  ['a', 'c'],
  ['q', 'e'],
  ['q', 'r'],
];
const maxItemAssociation = (items) => {
  const list = new Map();
  for (let index = 0; index < items.length; index++) {
    for (let j = 0; j < items[index].length; j++) {
      const item = items[index][j];
      if (list.has(item)) {
        list.set(item, new Set([...list.get(item), index]));
      } else {
        list.set(item, new Set([index]));
      }
    }
  }

  const output = new Map();
  for (let index = 0; index < items.length; index++) {
    const key = items[index].join('');
    const tmp = [];
    for (let j = 0; j < items[index].length; j++) {
      const item = items[index][j];
      if (list.has(item)) {
        Array.from(list.get(item)).forEach((i) => tmp.push(...items[i]));
      }
    }
    output.set(key, new Set(tmp.sort()));
  }

  let maxCount = 0;
  let maxSequence = null;
  for (let value of output.values()) {
    if (maxCount > value.size) continue;
    if (
      maxCount < value.size ||
      (maxCount === value.size &&
        Array.from(maxSequence).join('') > Array.from(value).join(''))
    ) {
      maxCount = value.size;
      maxSequence = value;
    }
  }

  return Array.from(maxSequence);
};

const result1 = maxItemAssociation(data1);
console.log('result1', result1);
console.log();
const result2 = maxItemAssociation(data2);
console.log('result2', result2);
