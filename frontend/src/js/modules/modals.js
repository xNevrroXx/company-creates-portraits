function modalsInit(triggerOpenBtnSelector, modalSelector, activeDisplayTypeStyle = "block", additionalFunctionOnOpen = () => {}, additionalFunctionOnClose = () => {}) {
  const triggerOpenBtns = document.querySelectorAll(triggerOpenBtnSelector);
  const modalEl = document.querySelector(modalSelector);
  const openModalEvent = new CustomEvent("openModal");

  triggerOpenBtns.forEach(triggerEl => {
    triggerEl.addEventListener("openModal", () => {
      modalEl.style.display = activeDisplayTypeStyle;

      activateModal(modalEl, activeDisplayTypeStyle, additionalFunctionOnOpen, additionalFunctionOnClose);
    })

    triggerEl.addEventListener("click", () => triggerEl.dispatchEvent(openModalEvent))
  })
}

function activateModal(modalSelectorOrElement, activeDisplayTypeStyle = "block", additionalFunctionOnOpen = () => {}, additionalFunctionOnClose = () => {}) {
  let modalEl = typeof modalSelectorOrElement === "string"
    ? document.querySelector(modalSelectorOrElement)
    : modalSelectorOrElement;
  const closeModalEvent = new CustomEvent("closeModal");

  modalEl.style.display = activeDisplayTypeStyle;
  additionalFunctionOnOpen();

  modalEl.addEventListener("closeModal", (event) => {
    modalEl.dispatchEvent(new Event("click"));
  })

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