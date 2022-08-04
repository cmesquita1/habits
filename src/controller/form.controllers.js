import Notification from "./notification.controller.js";

export default class Form {
  static isFormValid(e) {
    const formElements = Array.from(e.target.form.elements);
    const data = {};
    for (let i = 0; i < formElements.length; i++) {
      const currentElement = formElements[i];

      if (currentElement.name !== "") {
        const { value, name } = currentElement;

        if (Form.checkFieldValidity(currentElement)) {
          data[name] = value;
        } else {
          return currentElement.name;
        }
      }
    }

    return data;
  }

  static checkFieldValidity(field) {
    if (!field.validity.valid || field.value.trim() === "") return false;
    return true;
  }

  static alertFieldInvalid(fieldName) {
    if (fieldName === "email") {
      const invalidEmailNot = Notification.createNotification(
        "Email inválido.",
        false
      );
      Notification.showNotification(invalidEmailNot);
      return;
    } else if (fieldName === "password") {
      const invalidPasswordNot = Notification.createNotification(
        "Senha inválida.",
        false
      );
      Notification.showNotification(invalidPasswordNot);
      return;
    } else if (fieldName === "title") {
      const invalidTitleNot = Notification.createNotification(
        "Título inválido.",
        false
      );
      Notification.showNotification(invalidTitleNot);
      return;
    } else if (fieldName === "description") {
      const invalidDescriptionNot = Notification.createNotification(
        "Descrição inválida.",
        false
      );
      Notification.showNotification(invalidDescriptionNot);
      return;
    } else if (fieldName === "category") {
      const invalidCategoryNot = Notification.createNotification(
        "Categoria inválida.",
        false
      );
      Notification.showNotification(invalidCategoryNot);
      return;
    } else if (fieldName === "name") {
      const invalidNameNot = Notification.createNotification(
        "Nome inválido.",
        false
      );
      Notification.showNotification(invalidNameNot);
      return;
    } else if (fieldName === "urlImage") {
      const invalidImageNot = Notification.createNotification(
        "Imagem inválida.",
        false
      );
      Notification.showNotification(invalidImageNot);
      return;
    } else {
      const genericNot = Notification.createNotification(
        "Verifique os campos e tente novamente.",
        false
      );
      Notification.showNotification(genericNot);
      return;
    }
  }
}