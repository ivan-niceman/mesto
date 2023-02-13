export default class Card {
  constructor(data, templateSelector, zoomImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._zoomImage = zoomImage;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement;
  }

  _likeCard() {
    this._card.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    this._card.querySelector('.element__like').addEventListener('click', () => this._likeCard());
    this._card.querySelector('.element__trash').addEventListener('click', () => this._deleteCard());
    this._card.querySelector('.element__image').addEventListener('click', () => this._zoomImage(this._name, this._link));
  }

  generateCard() {
    this._card = this._getElement();
    this._setEventListeners();

    this._card.querySelector('.element__image').src = this._link;
    this._card.querySelector('.element__image').alt = this._name;
    this._card.querySelector('.element__title').textContent = this._name;

    return this._card;
  }
}
