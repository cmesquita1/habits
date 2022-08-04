export default class Access {

  static homeUrl = "/src/views/homepage.views.html";
  static loginUrl = "/index.html";

  static redirectToLoginPage() {
    window.location.href = this.loginUrl;
  }
  static redirectToHomePage() {
    window.location.href = this.homeUrl;
  }

  static isTokenExpired(token) {
    const payload = token.split(".")[1];
    const decodedJSON = JSON.parse(atob(payload));
    const currentTime = Date.now();
    decodedJSON.exp = parseInt(`${decodedJSON.exp}000`);

    if (decodedJSON.exp < currentTime) {
      return true;
    }
    return false;
  }
}
