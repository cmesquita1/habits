export default class Habits {
  static baseUrl = "https://habits-kenzie.herokuapp.com/api";
  static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("@kenziehabits:token")}`,
  };

  static async getDoneHabits() {
    return await fetch(`${this.baseUrl}/habits/`, {
      method: "GET",
      headers: this.headers,
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

        const doneHabits = res.filter((habit) => habit.habit_status);

        return doneHabits;
      })
      .catch((err) => {
        return err;
      });
  }

  static async updateHabit(id, updateObj) {
    return await fetch(`${this.baseUrl}/habits/${id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(updateObj),
    })
      .then(async (res) => {
        console.log(res)
        if (!res.ok) {
          throw {
            status: res.status,
            statusText: res.statusText,
            message: res.message,
          };
        }

        res = await res.json();

        const doneHabits = res.filter((habit) => habit.habit_status);

        return doneHabits;
      })
      .catch((err) => {
        return err;
      });
  }

  static async setHabitDone(id) {
    return await fetch(this.baseUrl + `/habits/complete/${id}`, {
      method: "PATCH",
      headers: this.headers,
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

        const doneHabits = res.filter((habit) => habit.habit_status);

        return doneHabits;
      })
      .catch((err) => {
        return err;
      });
  }

  static async createNewHabit(habitObj) {
    return await fetch(this.baseUrl + "/habits", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(habitObj),
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

        const doneHabits = res.filter((habit) => habit.habit_status);

        return doneHabits;
      })
      .catch((err) => {
        return err;
      });
  }

  static async getAllHabits() {
    return await fetch(`${this.baseUrl}/habits`, {
      method: "GET",
      headers: this.headers,
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

        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  static async deleteHabit(id) {
    return await fetch(`${this.baseUrl}/habits/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => {
        return err;
      });
  }

}