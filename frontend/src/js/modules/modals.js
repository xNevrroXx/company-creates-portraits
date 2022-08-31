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

function modalOnScroll() {
  // first function
  let wasOpenedModalFlag = false;
  document.addEventListener("click", toggleFlag);
  function toggleFlag() {
    wasOpenedModalFlag = true;
    document.removeEventListener("click", toggleFlag);
  }
  document.addEventListener("scroll", openOnScrollDown)
  function openOnScrollDown() {
    if(wasOpenedModalFlag) {
      document.removeEventListener("scroll", openOnScrollDown);
      return;
    }

    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const clientHeight = Math.min(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )

    if(scrollHeight === window.scrollY + clientHeight) {
      activateModal(".popup-gift", "block", () => {
        wasOpenedModalFlag = true;
        if(document.querySelector(".fixed-gift"))
          document.querySelector(".fixed-gift").remove();
      });
    }
  }
}

export {activateModal, modalsInit, modalOnScroll};