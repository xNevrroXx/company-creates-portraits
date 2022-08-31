function validate(formSelector, promocodeStr) {
  // validate this fields only. PSEUDO_CODE: {
  //   fileInputNames: ["upload"],
  //   inputNames: ["name", "email", "phone", "message"],
  //   selectNames: ["size", "material", "options"]
  // }
  const errors = {};

  const messageTextArea = document.querySelector(`${formSelector} textarea[name="message"]`);
  if(
    messageTextArea
    && messageTextArea.value !== 0
    && /^[а-яё\d \-;,.@'")(]{0,300}$/gim.test(messageTextArea.value.trim()) === false) {
    errors.message = "Менее 300 русских символов, а также -;,.@'\")(";
  }

  document.querySelectorAll(`${formSelector} input`).forEach(inputEl => {
    switch (inputEl.name) {
      case "upload":
        if(inputEl.files.length === 0) {
          errors.upload = "Обязательное поле";
        }
        break;
      case "name":
        if(!inputEl.value) {
          errors.name = "Обязательное поле";
        }
        else if(/^[а-яё\- ]{2,}$/gi.test(inputEl.value.trim()) === false) {
          errors.name = "Необходимо более 2-ух символов на русском языке";
        }
        break;
      case "phone":
        if(!inputEl.value) {
          errors.phone = "Обязательное поле"
        }
        break;
      case "email":
        if(inputEl.value && !validateEmail(inputEl.value)) {
          errors.email = "Неверный формат email-адреса";
        }
        break;
      case "promocode":
        if(inputEl.value && inputEl.value !== promocodeStr) {
          errors.promocode = "Такого промокода нет";
        }
        break;
      case "message":
        if(inputEl.value !== 0
          && /^[а-яё\d \-;,.@'")(]{0,300}$/gim.test(inputEl.value.trim()) === false) {
          errors.message = "Менее 300 русских символов, а также -;,.@'\")(";
        }
        break;
      default:
        throw new Error(`Something went wrong. Input name ${inputEl.name}`);
      }
    })
  document.querySelectorAll(`${formSelector} select`).forEach(selectEl => {
    switch (selectEl.name) {
      case "size":
        if(selectEl.value === "") {
          errors.size = "Обязательное поле";
        }
        break;
      case "material":
        if(selectEl.value === "") {
          errors.material = "Обязательное поле";
        }
        break;
      case "options":
        // необязательное поле для ввода
        break;
      default:
        throw new Error(`Something went wrong. Select name ${selectEl.name}`);
    }
  })

  if(Object.keys(errors).length === 0)
    return null;

  return errors;

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
}

export default validate;