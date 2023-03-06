export default class UserInfo {
  constructor(userSelectors) {
    this._profileName = document.querySelector(userSelectors.name);
    this._profileInfo = document.querySelector(userSelectors.info);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      info: this._profileInfo.textContent
    }
  }

  setUserInfo(userName, userInfo) {
    this._profileName.textContent = userName.value;
    this._profileInfo.textContent = userInfo.value;
  }
}
