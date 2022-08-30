import maskPhone from "./validation";
import {activateModal} from "./modals";
import validate from "./validate";
import {errors} from "browser-sync/dist/config";

function feedbackFormInit(formSelector, url, additionalFunctionOnSend = () => {}) {
  const formEl = document.querySelector(formSelector);

  maskPhone(`${formSelector} input[name="phone"]`);

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    for (const [name, value] of formData) {
      console.log(name, value)
    }

    const errors = validate(formSelector);
    if(errors) {
      // todo show errors of validation to user
      console.log(errors)
    }
    else {
      additionalFunctionOnSend();
      fetch(url, {method: "POST", body: formData})
        .then(response => response.text())
        .then(data => {
          console.log(data);
          changeContent(".popup-status h3", `Свяжемся с Вами в ближайшее время`);
          activateModal(".popup-status");
        })
        .catch(error => {
          console.log(error);
          changeContent(".popup-status h3", `Свяжемся с Вами в ближайшее время`);
          activateModal(".popup-status");
        });
    }
  })
}

function changeContent(wrapperSelector, contentHtml) {
  const elem = document.querySelector(wrapperSelector);
  elem.innerHTML = contentHtml;
}

export default feedbackFormInit;