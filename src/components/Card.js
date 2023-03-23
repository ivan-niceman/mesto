export default class Card {
  constructor(data, currentUserId, templateSelector, zoomImage, handleCartByClick, likeMyCard, deleteLikeMyCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._zoomImage = zoomImage;

    this._isOwner = data.owner._id === currentUserId;
    this._owner = data.owner._id;
    this._currentUserId = currentUserId;

    this._handleCartByClick = handleCartByClick;
    this._id = data._id;
    this._likes = data.likes;
    this._likeMyCard = likeMyCard;
    this._deleteLikeMyCard = deleteLikeMyCard;

    this._card = this._getElement();
    this._cardLike = this._card.querySelector('.element__like');
    this._cardTrash = this._card.querySelector('.element__trash');
    this._cardImage = this._card.querySelector('.element__image');
    this._cardTitle = this._card.querySelector('.element__title');
    this._cardLikeNumber = this._card.querySelector('.element__number-likes');
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  toggleLike(data) {
    this._cardLikeNumber.textContent = data.likes.length;
    this._cardLike.classList.toggle('element__like_active');
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
    this._cardLike = null;
    this._cardTrash = null;
    this._cardImage = null;
    this._cardTitle = null;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', evt => this._setLikes(evt));
    this._cardTrash.addEventListener('click', () => this._handleCartByClick(this._id));
    this._cardImage.addEventListener('click', () => {
      this._zoomImage(this._name, this._link)
    });
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._cardLikeNumber.textContent = this._likes.length;

    if (!this._isOwner) {
      this._cardTrash.remove();
    }

    if (this._addlikedCard()) {
      this._cardLike.classList.add('element__like_active');
    } else {
      this._cardLike.classList.remove('element__like_active');
    }

    return this._card;
  }

  _setLikes(evt) {
    if (evt.target.classList.contains('element__like_active')) {
      this._deleteLikeMyCard(this._id, this);
    } else {
      this._likeMyCard(this._id, this);
    }
  }

  _addlikedCard() {
    return this._likes.find((userLike) => userLike._id === this._currentUserId);
  }
}
