export default class Card {
  constructor({data, zoomImage}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._zoomImage = zoomImage;

    this._card = this._getElement();
    this._cardLike = this._card.querySelector('.element__like');
    this._cardTrash = this._card.querySelector('.element__trash');
    this._cardImage = this._card.querySelector('.element__image');
    this._cardTitle = this._card.querySelector('.element__title');
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._cardLike.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
    this._cardLike = null;
    this._cardTrash = null;
    this._cardImage = null;
    this._cardTitle = null;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this._toggleLike());
    this._cardTrash.addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () => this._zoomImage(this._name, this._link));
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._card;
  }
}
