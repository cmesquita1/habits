import Form from "../controller/form.controllers.js";
import Access from "../controller/access.controllers.js";
import User from "../models/user.models.js"
import Notification from "../controller/notification.controller.js";
import Modal from "../controller/modal.controller.js";

(
    async () => {
        const token = localStorage.getItem("@kenziehabits:token");
        
        if(token != null){
            if(Access.isTokenExpired(token)){
                const tokenExpiredNot = Notification.createNotification("Sessão expirada, logue-se novamente.", false);
                Notification.showNotification(tokenExpiredNot);
                return;
            }
            else {
                Access.redirectToHomePage();
                return;
            }
        }
    }
)();

document.getElementById("loginFormButton").onclick = async (e) => {
    e.preventDefault();

    const formData = Form.isFormValid(e);

    if(formData.email === undefined || formData.password === undefined){
        Form.alertFieldInvalid(formData);
        return;
    }

    try {
        Modal.showLoading();
        const loginResponse = await User.logUserIn(formData.email, formData.password);
        Modal.hideLoading();
        if(loginResponse.status){
            throw loginResponse.message;
        }
        else {
            const loginNotification = Notification.createNotification("Login bem sucedido!", true);
            Notification.showNotification(loginNotification);
            setTimeout(()=> {
                Access.redirectToHomePage();
            }, 1000)
        }
    }
    catch(error){ 
        const errorNotification = Notification.createNotification(error, false);
        Notification.showNotification(errorNotification);
    }
}
