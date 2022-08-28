function modalsInit(triggerOpenBtnSelector, modalSelector, activeDisplayTypeStyle = "block", additionalFunctionOnOpen = () => {}, additionalFunctionOnClose = () => {}) {
  const triggerOpenBtns = document.querySelectorAll(triggerOpenBtnSelector);
  const modalEl = document.querySelector(modalSelector);
  const dispatchOpenModalEvent = new CustomEvent("openModal");

  triggerOpenBtns.forEach(triggerEl => {
    triggerEl.addEventListener("openModal", () => {
      additionalFunctionOnOpen();
      modalEl.style.display = activeDisplayTypeStyle;

      activateModal(modalEl, activeDisplayTypeStyle, additionalFunctionOnOpen, additionalFunctionOnClose)
    })

    triggerEl.addEventListener("click", () => triggerEl.dispatchEvent(dispatchOpenModalEvent))
  })
}

function activateModal(modalSelectorOrElement, activeDisplayTypeStyle = "block", additionalFunctionOnOpen = () => {}, additionalFunctionOnClose = () => {}) {
  let modalEl = typeof modalSelectorOrElement === "string"
    ? document.querySelector(modalSelectorOrElement)
    : modalSelectorOrElement;

  modalEl.style.display = activeDisplayTypeStyle;
  additionalFunctionOnOpen();

  modalEl.addEventListener("click", (event) => {
    const target = event.target;
    if(
      (target.tagName === "BUTTON" && target.classList.contains("popup_close")) ||
      target === event.currentTarget
    ) {
      modalEl.style.display = "none";
      additionalFunctionOnClose();
    }
  })
}

export {activateModal, modalsInit};