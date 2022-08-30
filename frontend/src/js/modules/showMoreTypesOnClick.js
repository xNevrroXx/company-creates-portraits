function showMoreTypesOnClick(triggerSelector, targetSelector, newTargetClassName) {
  const triggerEl = document.querySelector(triggerSelector);
  const targetElems = document.querySelectorAll(targetSelector);

  triggerEl.addEventListener("click", () => {
    triggerEl.remove();

    targetElems.forEach(targetEl => {
      targetEl.className = newTargetClassName;
    })
  })
}

export default showMoreTypesOnClick;