function initBurger() {
  const burgerEl = document.querySelector("header .burger"),
    burgerSubmenu = document.querySelector("header ul.burger-menu");

  addEventsAndInitBurger();
  window.onresize = (event) => {
    addEventsAndInitBurger();
  }


  function addEventsAndInitBurger() {
    const clientWidth = document.documentElement.clientWidth;

    if(clientWidth > 991) {
      burgerEl.onclick = () => {};
      if(burgerSubmenu.classList.contains("active"))
        toggleSubmenu();
    }
    else {
      burgerEl.onclick = toggleSubmenu;
    }
  }
  function toggleSubmenu() {
    if(burgerSubmenu.classList.contains("active")) {
      burgerSubmenu.classList.remove("active");
    }
    else {
      burgerSubmenu.classList.add("active");
    }
  }
}

export default initBurger;