function calcCostPortrait(formSelector, promocodeStr) {
  let resultCost = 0;
  let sizeIsSelectedFlag = false,
    materialIsSelectedFlag = false;

  console.log(document.querySelector(formSelector))
  const formEl = document.querySelector(formSelector);
  const
    sizeEl = formEl.querySelector(`select[name="size"]`),
    materialEl = formEl.querySelector(`select[name="material"]`),
    optionsEl = formEl.querySelector(`select[name="options"]`),
    promoCodeEl = formEl.querySelector(`input[name="promocode"]`),
    resultCostEl = formEl.querySelector(".calc-price");

  sizeEl.addEventListener("change", function() {
    if(this.options.selectedIndex !== 0) {
      sizeIsSelectedFlag = true;
    }
    else {
      sizeIsSelectedFlag = false;
    }
    updateCost();
  });
  materialEl.addEventListener("change", function() {
    if(this.options.selectedIndex !== 0) {
      materialIsSelectedFlag = true;
    }
    else {
      materialIsSelectedFlag = false;
    }
    updateCost();
  })
  optionsEl.addEventListener("change", function() {
    updateCost();
  })
  promoCodeEl.addEventListener("change", function() {
    updateCost();
  })


  function updateCost() {
    resultCost =
      +sizeEl.options[sizeEl.options.selectedIndex].getAttribute("data-cost")
      + +materialEl.options[materialEl.options.selectedIndex].getAttribute("data-cost")
      + +optionsEl.options[optionsEl.options.selectedIndex].getAttribute("data-cost");

    const discount = (promoCodeEl.value === promocodeStr ? resultCost*0.3 : 0);
    resultCost -= discount;

    if(sizeIsSelectedFlag && materialIsSelectedFlag) {
      resultCostEl.textContent = resultCost.toString();
    }
    else {
      resultCostEl.textContent = "Для расчета нужно выбрать размер картины и материал картины";
    }
  }
}

export default calcCostPortrait;