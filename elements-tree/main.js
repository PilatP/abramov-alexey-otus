import './my-leaf';
import './my-tree';

const items = {
  id: 1,
  items: [
    {
      id: 2,
      items: [
        { id: 21 },
        { id: 22, items: [{ id: 221 }, { id: 222 }] },
        { id: 23 },
      ],
    },
    { id: 3, items: [{ id: 31 }, { id: 32 }] },
    { id: 4 },
  ],
};
const tree = document.getElementById('tree');
if (tree) tree.setAttribute('data-items', JSON.stringify(items));
