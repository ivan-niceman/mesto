export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cards) {
    cards.reverse().forEach( card => {
      this._renderer(card);
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
