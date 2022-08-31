function tabs(wrapperSelector, triggerContentMatchObj, activeTab = 0, activityClass = "active", concealmentClass = "") {
  const wrapperEl = document.querySelector(wrapperSelector);

  changeActivityClasses(triggerContentMatchObj.matchSlices[0]);

  document.querySelector(triggerContentMatchObj.wrapperTriggersSelector).addEventListener("click", function(event) {
    const target = event.target;

    triggerContentMatchObj.matchSlices.forEach(matchSlice => {
      if(target.className.includes(matchSlice.name)) {
        changeActivityClasses(matchSlice)
      }
      else {
        if(target.parentElement.className.includes(matchSlice.name)) {
          changeActivityClasses(matchSlice);
          return true;
        }
      }
    })
  })

  function changeActivityClasses(matchSlice) {
    if(triggerContentMatchObj.reserveContent && wrapperEl.querySelector(`${triggerContentMatchObj.reserveContent}`).classList.contains(activityClass)) {
      wrapperEl.querySelector(`${triggerContentMatchObj.reserveContent}`).classList.remove(activityClass);
    }

    wrapperEl.querySelectorAll(`${triggerContentMatchObj.wrapperTriggersSelector} > ${matchSlice.triggerTag}`).forEach(triggerEl => {
      if(triggerEl.className.includes(activityClass)) triggerEl.classList.remove(activityClass);
      if(triggerEl.className.includes(matchSlice.name)) triggerEl.classList.add(activityClass);
    })

    wrapperEl.querySelectorAll(`${triggerContentMatchObj.wrapperContentSelector} > ${matchSlice.contentTag}`).forEach(contentEl => {
      if(concealmentClass !== "") {
        if(!contentEl.className.includes(concealmentClass)) contentEl.classList.add(concealmentClass);
        if(contentEl.className.includes(matchSlice.name)) contentEl.classList.remove(concealmentClass);
      }
      else {
        if(contentEl.className.includes(activityClass)) contentEl.classList.remove(activityClass);
        if(contentEl.className.includes(matchSlice.name)) contentEl.classList.add(activityClass);
      }
    })

    if(triggerContentMatchObj.reserveContent && wrapperEl.querySelectorAll(`${triggerContentMatchObj.wrapperContentSelector} > ${triggerContentMatchObj.contentTag}.active`).length === 0) {
      wrapperEl.querySelector(`${triggerContentMatchObj.reserveContent}`).classList.add(activityClass);
    }
  }
}

export default tabs;