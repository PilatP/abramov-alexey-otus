class MyLeaf extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['data-item'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data-item') {
      this.item = newValue;
    }
  }
  render() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');
    const style = document.createElement('style');
    style.textContent = '.wrapper {display: flex; gap: 8px;}';
    wrapper.append(style);

    const leafElement = document.createElement('p');
    leafElement.textContent = this.item;

    wrapper.append(leafElement);

    this.shadowRoot.append(wrapper);
  }
}

customElements.define('my-leaf', MyLeaf);
