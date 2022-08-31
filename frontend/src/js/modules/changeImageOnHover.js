function changeImageOnHover(wrapperSelector, imagesMatchArr) {
  document.querySelectorAll(`${wrapperSelector} .sizes-block`).forEach(elem => {
    elem.addEventListener("mouseenter", function (event) {
      const targetImage = this.querySelector("img");

      imagesMatchArr.some((matchSlice) => {
        const isMatch = targetImage.getAttribute("src") === matchSlice.plugSrc;
        if (isMatch) {
          targetImage.setAttribute("src", matchSlice.originalImg);
        }

        return targetImage.classList.contains(matchSlice.name)
      })
    })
  })

  document.querySelectorAll(`${wrapperSelector} .sizes-block`).forEach(elem => {
    elem.addEventListener("mouseleave", function (event) {
      if(event.target && Array.prototype.slice.call(this.children).every(childrenEl => {
        return childrenEl !== event.target; // если курсор не попал на один из дочерних элементов.
      }) === true){
        const targetImage = this.querySelector("img");

        imagesMatchArr.some((matchSlice) => {
          const isMatch = targetImage.getAttribute("src") === matchSlice.originalImg;
          if (isMatch) {
            targetImage.setAttribute("src", matchSlice.plugSrc);
          }

          return targetImage.classList.contains(matchSlice.name)
        })
      }
    })
  })
}

export default changeImageOnHover;