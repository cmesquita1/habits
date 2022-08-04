import Habits from "../models/habit.models.js";
import Form from "./form.controllers.js";
import Access from "./access.controllers.js";
import Notification from "./notification.controller.js";
import User from "../models/user.models.js";

export default class Modal {
  static createModalTemplate(modalH2 = "placeholder - título") {
    const body = document.querySelector("body");
    const modalWrapper = document.createElement("div");
    const modal = document.createElement("div");
    const modalHeader = document.createElement("div");
    const modalTitle = document.createElement("h2");
    const modalCloseBtn = document.createElement("button");
    const modalForm = document.createElement("form");
    const modalDivButtons = document.createElement("div");

    modalWrapper.classList.add("modalWrapper");
    modal.classList.add("modal");
    modalHeader.classList.add("modal__header");
    modalForm.classList.add("modal__form");
    modalDivButtons.classList.add("modal__buttons");
    modalCloseBtn.classList.add("closeModal__btn");
    modalTitle.innerText = `${modalH2}`;
    modalCloseBtn.innerText = "X";

    modalCloseBtn.onclick = () => {
      modal.classList.add("modal--hide-modal");
      setTimeout(() => {
        modalWrapper.remove();
      },200)
    };

    modalHeader.append(modalTitle, modalCloseBtn);
    modal.append(modalHeader, modalForm, modalDivButtons);
    modalWrapper.append(modal);

    body.append(modalWrapper);
  }
  
  static showUserEditModal() {
    Modal.createModalTemplate("Editar perfil");

    const userData = JSON.parse(localStorage.getItem("@kenziehabits:userdata"));

    const modalForm = document.querySelector(".modal__form");

    const nameDiv = document.createElement("div");
    const nameLabel = document.createElement("label");
    const nameInput = document.createElement("input");
    const urlImageDiv = document.createElement("div");
    const urlImageLabel = document.createElement("label");
    const urlImageInput = document.createElement("input");
    const saveChangesBtn = document.createElement("button");

    saveChangesBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const formData = Form.isFormValid(e);
      
      if(typeof formData === "object") {
        Modal.showLoading();
        User.editUserData({
          usr_name: formData.name,
          usr_image: formData.urlImage
        })
        .then((res) => {
          Modal.hideLoading();
          Access.redirectToHomePage()
        })
        .catch((err) => console.error(err))
      } else {
        Form.alertFieldInvalid(formData)
      }
    });

    nameDiv.classList.add("form__inputContainer");
    urlImageDiv.classList.add("form__inputContainer");
    saveChangesBtn.classList.add("mainButton", "mainButton--saveChanges");

    nameLabel.innerText = "Nome";
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.setAttribute("required", "true")
    nameInput.value = userData.usr_name;
    urlImageLabel.innerText = "URL da imagem do perfil";
    urlImageInput.type = "url";
    urlImageInput.name = "urlImage";
    urlImageInput.setAttribute("required", "true");
    urlImageInput.value = userData.usr_image;
    saveChangesBtn.innerText = "Salvar alterações";

    nameDiv.append(nameLabel, nameInput);
    urlImageDiv.append(urlImageLabel, urlImageInput);
    modalForm.append(nameDiv, urlImageDiv, saveChangesBtn);
  }

  static showNewHabitModal() {
    Modal.createModalTemplate("Criar hábito");

    const modalForm = document.querySelector(".modal__form");
    const modalDivButtons = document.querySelector(".modal__buttons");

    const titleDiv = document.createElement("div");
    const titleLabel = document.createElement("label");
    const titleInput = document.createElement("input");
    const descriptionDiv = document.createElement("div");
    const descriptionLabel = document.createElement("label");
    const descriptionTextarea = document.createElement("textarea");
    const categoryDiv = document.createElement("div");
    const categoryLabel = document.createElement("label");
    const categorySelect = document.createElement("select");
    const saudeOption = document.createElement("option");
    const estudosOption = document.createElement("option");
    const casaOption = document.createElement("option");
    const trabalhoOption = document.createElement("option");
    const lazerOption = document.createElement("option");
    const placeholderOption = document.createElement("option");
    const insertBtn = document.createElement("button");

    titleDiv.classList.add("form__inputContainer");
    descriptionDiv.classList.add("form__inputContainer");
    categoryDiv.classList.add("form__inputContainer");
    insertBtn.classList.add("mainButton", "mainButton--insert");

    titleInput.type = "text"
    titleInput.name = "title"
    titleInput.id = "title"
    titleInput.setAttribute("required", "true")
    descriptionTextarea.name = "description"
    descriptionTextarea.id = "description"
    descriptionTextarea.setAttribute("required", "true")
    categorySelect.name = "category"
    categorySelect.id = "category"
    categorySelect.setAttribute("required", "true")

    titleLabel.innerText = "Título";
    titleInput.placeholder = "Digitar título";
    descriptionLabel.innerText = "Descrição";
    descriptionTextarea.placeholder = "Digitar descrição";
    categoryLabel.innerText = "Categoria";
    placeholderOption.value = "";
    placeholderOption.setAttribute("selected", "true");
    placeholderOption.setAttribute("hidden", "true");
    placeholderOption.setAttribute("disabled", "true");
    placeholderOption.innerText = "Selecionar categoria"
    saudeOption.value = "saude";
    saudeOption.innerText = "Saúde";
    estudosOption.value = "estudos";
    estudosOption.innerText = "Estudos";
    trabalhoOption.value = "trabalho";
    trabalhoOption.innerText = "Trabalho";
    casaOption.value = "casa";
    casaOption.innerText = "Casa";
    lazerOption.value = "lazer";
    lazerOption.innerText = "Lazer";
    insertBtn.innerText = "Inserir"

    categorySelect.append(
      placeholderOption,
      saudeOption,
      estudosOption,
      trabalhoOption,
      casaOption,
      lazerOption
    );

    titleDiv.append(titleLabel, titleInput);
    descriptionDiv.append(descriptionLabel, descriptionTextarea);
    categoryDiv.append(categoryLabel, categorySelect);

    modalDivButtons.append(insertBtn)
    modalForm.append(titleDiv, descriptionDiv, categoryDiv, modalDivButtons)

    insertBtn.onclick = (e) => {
      e.preventDefault()
      const formData = Form.isFormValid(e)

      if (typeof formData == "object") {
        Modal.showLoading();
        Habits.createNewHabit({
          habit_title: formData.title,
          habit_description: formData.description,
          habit_category: formData.category
        })
        .then((res) => {
          const habitSucess = Notification.createNotification("Hábito criado com sucesso", true);
          Notification.showNotification(habitSucess);
          setTimeout(() => {
            Access.redirectToHomePage()
            Modal.hideLoading();
          }, 1700);
          
        })
        .catch((err) => console.error(err))
      } else {
        Modal.hideLoading();
        Form.alertFieldInvalid(formData)
      }
    }
  }

  
  static async showEditHabitModal(id) {
    Modal.showLoading();
    const allHabits = await Habits.getAllHabits();
    Modal.hideLoading();
    const { habit_title, habit_description, habit_category } = allHabits.find(( { habit_id } ) => habit_id === Number(id));

    Modal.createModalTemplate("Editar hábito");
    const smallTitle = document.createElement("label");
    const inputTitle = document.createElement("input");
    const smallDescription = document.createElement("label");
    const inputDescription = document.createElement("textarea");
    const smallCategory = document.createElement("label");
    const inputCategory = document.createElement("select");
    const status = document.createElement("h4");
    const inputCheck = document.createElement("input");

    const deleteHabit = document.createElement("button");
    const saveHabit = document.createElement("button");

    const optionOne = document.createElement("option");
    const optionTwo = document.createElement("option");
    const optionThree = document.createElement("option");
    const optionFour = document.createElement("option");
    const optionFive = document.createElement("option");

    const divStatus = document.createElement("div");
    const divTitle = document.createElement("div");
    const divDescription = document.createElement("div");
    const divCategory = document.createElement("div");

    inputCheck.classList.add("checkbox");
    inputTitle.classList.add("input_title");
    inputDescription.classList.add("input_descryption");
    inputCategory.classList.add("input_category");
    divTitle.classList.add("form__inputContainer");
    divDescription.classList.add("form__inputContainer");
    divCategory.classList.add("form__inputContainer");
    divStatus.classList.add("form__statusContainer");
    deleteHabit.className = "deleteHabit mainButton";
    saveHabit.className = "saveHabit mainButton";

    inputTitle.value = habit_title;
    inputDescription.value = habit_description;
    smallTitle.innerText = "Título";
    inputTitle.placeholder = "Insira o título aqui";
    smallDescription.innerText = "Descrição";
    inputDescription.placeholder = "Insira a descrição aqui";
    smallCategory.innerText = "Categoria";
    status.innerText = "Status";
    inputCheck.type = "checkbox";
    deleteHabit.innerText = "Excluir";
    saveHabit.innerText = "Salvar alterações";

    inputTitle.name = "title";
    inputDescription.name = "description";
    inputCategory.name = "category";

    optionOne.innerText = "Saúde";
    optionOne.value = "saude";
    optionTwo.innerText = "Trabalho";
    optionTwo.value = "trabalho";
    optionThree.innerText = "Lazer";
    optionThree.value = "lazer"
    optionFour.innerText = "Casa";
    optionFour.value = "casa";
    optionFive.innerText = "Estudo";
    optionFive.value = "estudo";

    const modalForm = document.querySelector(".modal__form");
    const modalButtons = document.querySelector(".modal__buttons");

    modalForm.append(
      divTitle,
      divDescription,
      divCategory,
      divStatus,
      modalButtons
    );
    inputCategory.append(optionOne, optionTwo, optionThree, optionFour, optionFive);

    inputCategory.value = habit_category.toLowerCase();

    divStatus.append(status, inputCheck);
    divTitle.append(smallTitle, inputTitle);
    divDescription.append(smallDescription, inputDescription);
    divCategory.append(smallCategory, inputCategory);
    modalButtons.append(deleteHabit, saveHabit);

    deleteHabit.onclick = () => {
      const modal = document.querySelector(".modalWrapper");
      modal.remove();

      Modal.showDeleteHabitModal(id);
    };
    
    saveHabit.onclick = async (e) => {
      e.preventDefault();

      const formData = Form.isFormValid(e);

      if (formData.title === undefined || formData.description === undefined) {
        Form.alertFieldInvalid(formData);
        return;
      }

      const updateObj = {
        habit_title: `${formData.title}`,
        habit_description: `${formData.description}`,
        habit_category: `${formData.category}`,
      };

      try {
        Modal.showLoading();
        const updateResponse = await Habits.updateHabit(id, updateObj);
        Modal.hideLoading();

        if (updateResponse.status) {
          throw updateResponse.message;
        } else {
          const updateNotification = Notification.createNotification(
            "Hábito atualizado com sucesso!",
            true
          );
          Notification.showNotification(updateNotification);
          setTimeout(() => {
            Access.redirectToHomePage();
          }, 2000);
        }
      } catch (error) {
        const errorNotification = Notification.createNotification(error, false);
        Notification.showNotification(errorNotification);
      }
      await Habits.updateHabit(id, updateObj);
      if (inputCheck.checked == true) {
        await Habits.setHabitDone(id);
      }
    };
  }

  static showDeleteHabitModal(id) {
    Modal.createModalTemplate("Excluir hábito");

    const divTitle = document.createElement("div");
    const title = document.createElement("h1");
    const titleDescription = document.createElement("h3");

    const cancelDeletion = document.createElement("button");
    const confirmDeletion = document.createElement("button");

    title.innerText = "Certeza que deseja excluir este hábito?";
    titleDescription.innerText =
      "Após executar essa ação não será possível desfazer";
    cancelDeletion.innerText = "Cancelar";
    confirmDeletion.innerText = "Sim, excluir este hábito";

    divTitle.classList.add("title__container");
    cancelDeletion.className = "cancel__deletion mainButton";
    confirmDeletion.className = "confirm__deletion mainButton";

    const modalForm = document.querySelector(".modal__form");
    const modalButtons = document.querySelector(".modal__buttons");

    modalForm.append(divTitle);
    modalButtons.append(cancelDeletion, confirmDeletion);
    divTitle.append(title, titleDescription);

    cancelDeletion.onclick = () => {
      const modal = document.querySelector(".modalWrapper");
      modal.remove();
      Modal.showEditHabitModal();
    };

    confirmDeletion.onclick = (e) => {
      e.preventDefault();
      Modal.showLoading();
      Habits.deleteHabit(id);
      Modal.hideLoading();

      const deleteNotification = Notification.createNotification(
        "Hábito deletado com sucesso!",
        true
      );
      Notification.showNotification(deleteNotification);
      setTimeout(() => {
        Access.redirectToHomePage();
      }, 2000);
    };
  }

  static showLoading(){
    const loadingContainer = document.querySelector(".loadingContainer");
    loadingContainer.style = "display: flex;"
    return;
  }

  static hideLoading(){
    const loadingContainer = document.querySelector(".loadingContainer");
    loadingContainer.style = "display: none;"
    return;
  }
}
