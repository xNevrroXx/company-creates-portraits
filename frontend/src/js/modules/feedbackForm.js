import maskPhone from "./maskPhone";
import {activateModal} from "./modals";
import validate from "./validate";

function feedbackFormInit(formSelector, url, additionalFunctionOnSend = () => {}, promocodeStr) {
  const formEl = document.querySelector(formSelector);

  if(formEl.querySelector(`input[name="phone"]`)) {
    maskPhone(`${formSelector} input[name="phone"]`);
  }

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    for (const [name, value] of formData) {
      console.log(name, value)
    }

    const errors = validate(formSelector, promocodeStr);
    if(errors) {
      // todo show errors of validation to user
      console.log(errors);
    }
    else {
      additionalFunctionOnSend();
      fetch(url, {method: "POST", body: formData})
        .then(response => response.text())
        .then(data => {
          console.log(data);
          // notification of the form sending status
          changeContent(".popup-status h3", `Свяжемся с Вами в ближайшее время`);
          activateModal(".popup-status");
          formEl.reset();
        })
        .catch(error => {
          console.log(error);
          // notification of the form sending status
          changeContent(".popup-status h3", `Что-то пошло не так -<br> можете попробовать еще раз позже`);
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