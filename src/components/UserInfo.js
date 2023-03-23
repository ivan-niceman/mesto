export default class UserInfo {
  constructor(userSelectors) {
    this._name = document.querySelector(userSelectors.name);
    this._about = document.querySelector(userSelectors.about);
    this._avatar = document.querySelector(userSelectors.avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._about.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
}
