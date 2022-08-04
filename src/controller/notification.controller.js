export default class Notification {
  static createNotification(message, successful = true) {
    const notificationWrapper = document.createElement("div");
    notificationWrapper.classList.add("notificationCard");
    const notificationInner = document.createElement("div");
    notificationInner.classList.add(
      "notificationCard__inner",
      "boxShadow--strong"
    );

    const notificationDetail = document.createElement("div");
    notificationDetail.classList.add("notification__detail");
    successful
      ? notificationDetail.classList.add("notificationSuccess")
      : notificationDetail.classList.add("notificationError");

    const notificationTextWrapper = document.createElement("div");
    notificationTextWrapper.classList.add("notificationCard__text");

    const notificationLabel = document.createElement("p");
    notificationLabel.classList.add("notificationLabel");
    successful
      ? (notificationLabel.innerText = "Sucesso!")
      : (notificationLabel.innerText = "Erro!");

    const notificationContent = document.createElement("p");
    notificationContent.classList.add("notificationContent");
    notificationContent.innerText = message;

    notificationTextWrapper.append(notificationLabel, notificationContent);
    notificationInner.append(notificationDetail, notificationTextWrapper);

    notificationWrapper.appendChild(notificationInner);
    return notificationWrapper;
  }

  static async showNotification(notification) {
    const notificationExists = document.querySelector(".notificationCard");
    if (notificationExists) {
      notificationExists.remove();
    }

    const newNotification = document
      .querySelector("body")
      .insertAdjacentElement("afterbegin", notification);

    setTimeout(() => {
      newNotification.remove();
    }, 5000);
  }
}