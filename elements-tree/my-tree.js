class MyTree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {}

  static get observedAttributes() {
    return ['data-items'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-items') {
      this.items = JSON.parse(newValue || '{}');
      this.render();
    }
  }

  render() {
    const wrapper = document.createElement('div');
    if (this.items) {
      this.populateLeaves(wrapper, this.items);
    }
    this.shadowRoot.append(wrapper);
  }

  createLeafElement = (value) => {
    const itemElement = document.createElement('my-leaf');
    itemElement.setAttribute('data-item', value);
    return itemElement;
  };

  addToLeafWrapper = (leaf, offset = 0) => {
    const itemElement = document.createElement('div');
    itemElement.style.marginLeft = `${offset}px`;
    itemElement.append(leaf);
    return itemElement;
  };

  populateLeaves = (wrapper, root, offset = 0) => {
    if (!root) return;
    const leftElement = this.createLeafElement(root.id);
    const leafWrapper = this.addToLeafWrapper(leftElement, offset);
    wrapper.append(leafWrapper);

    root.items?.forEach((item) => {
      this.populateLeaves(leafWrapper, item, offset + 12);
    });
  };
}

customElements.define('my-tree', MyTree);
