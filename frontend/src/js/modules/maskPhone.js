function maskPhone(inputSelector) {
  const phoneInput = document.querySelector(inputSelector);
  let isPassedValidation = false;

  phoneInput.addEventListener("focus", (e) => {
    if(!isPassedValidation) e.target.value = "+7";
  });
  phoneInput.addEventListener("blur", (e) => {
    isPassedValidation = /^[7|8]\d{10}$/.test(e.target.value.replace(/[-+)(\D ]/gi, ""));

    if(!isPassedValidation) e.target.value = "";
  });
  phoneInput.addEventListener('input', function (e) {
    if(/^[7|8]/.test(e.target.value.replace(/^[+]/,"")) === false) { // если затерли в ноль, вероятно, выделение всего поля + вставка значения
      e.target.value = "+7" + e.target.value.replace(/\D/gi, '');

      const onlyDigits = e.target.value.replace(/\D/gi, "");
      if(onlyDigits.length > 11) {
        e.target.value = onlyDigits.slice(onlyDigits.length - 11);
      }
    }
    else if(e.target.selectionStart === e.target.selectionEnd && e.target.selectionEnd === e.target.value.length && /^[(+7)|8]/.test(e.target.value)) { // обычный ввод с конца строки
      const x = e.target.value.replace(/\D/g, '').match(/^[+7|8](\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      e.target.value = !x[2] ? '+7(' + x[1] : '+7(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');

      isPassedValidation = /^[7|8]\d{10}/.test(e.target.value.replace(/[-+()\D ]/gi, ""));
    }
    else if(e.data && !/\d/.test(e.data)) { // если пишут с середины не цифры
      e.target.value = e.target.value.replace(/[-+)( \D]/g, "");
    }
  });
}

export default maskPhone;