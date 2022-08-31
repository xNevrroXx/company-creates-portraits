function tabs(wrapperSelector, triggerContentMatchObj, activeTab = 0, activityClass = "active") {
  const wrapperEl = document.querySelector(wrapperSelector);

  changeActivityClasses(triggerContentMatchObj.matchSlices[0].name);

  document.querySelector(triggerContentMatchObj.wrapperTriggersSelector).addEventListener("click", (event) => {
    const target = event.target;

    triggerContentMatchObj.matchSlices.forEach(matchSlice => {
      if(target.className.includes(matchSlice.name)) {
        changeActivityClasses(matchSlice.name)
      }
    })
  })

  function changeActivityClasses(targetTypeName) {
    if(wrapperEl.querySelector(`${triggerContentMatchObj.reserveContent}`).classList.contains(activityClass)) {
      wrapperEl.querySelector(`${triggerContentMatchObj.reserveContent}`).classList.remove(activityClass);
    }

    wrapperEl.querySelectorAll(`${triggerContentMatchObj.wrapperTriggersSelector} > li`).forEach(triggerEl => {
      if(triggerEl.className.includes(activityClass)) triggerEl.classList.remove(activityClass);
      if(triggerEl.className.includes(targetTypeName)) triggerEl.classList.add(activityClass);
    })

    wrapperEl.querySelectorAll(`${triggerContentMatchObj.wrapperContentSelector} > div`).forEach(contentEl => {
      if(contentEl.className.includes(activityClass)) contentEl.classList.remove(activityClass);
      if(contentEl.className.includes(targetTypeName)) contentEl.classList.add(activityClass);
    })

    if(wrapperEl.querySelectorAll(`${triggerContentMatchObj.wrapperContentSelector} > div.active`).length === 0) {
      wrapperEl.querySelector(`${triggerContentMatchObj.reserveContent}`).classList.add(activityClass);
    }
  }
}

export default tabs;