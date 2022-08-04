import Access from "../controller/access.controllers.js";

export default class User {
  static baseUrl = "https://habits-kenzie.herokuapp.com/api";
  static async editUserData(editObj) {
    return await fetch(`${this.baseUrl}/user/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@kenziehabits:token")}`,
      },
      body: JSON.stringify(editObj),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw {
            status: res.status,
            statusText: res.statusText,
            message: res.message,
          };
        }

        res = await res.json();

        localStorage.setItem(
          "@kenziehabits:userdata",
          JSON.stringify(res)
        );
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  static logUserOut() {
    localStorage.clear();
    Access.redirectToLoginPage();
  }

  static async logUserIn(email, password) {
    const logInData = {
      email: email,
      password: password,
    };

    const response = await fetch(this.baseUrl + "/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInData),
    })
      .then(async (res) => {
        const resData = await res.json();

        if (!res.ok) {
          throw {
            status: res.status,
            statusText: res.statusText,
            message: resData.message,
          };
        }

        localStorage.setItem(
          "@kenziehabits:userdata",
          JSON.stringify(resData.response)
        );
        localStorage.setItem("@kenziehabits:token", resData.token);

        return resData;
      })
      .catch((err) => {
        return err;
      });

    return response;
  }
}
