// third-side modules
import {tns} from "tiny-slider";
// own modules
import {modalsInit} from "./modules/modals";
import feedbackFormInit from "./modules/feedbackForm";
import showMoreTypesOnClick from "./modules/showMoreTypesOnClick";

const serverUrl = "http://localhost:9999";
const feedbacksUrl = `${serverUrl}/feedbacks`;

window.addEventListener("DOMContentLoaded", () => {
  // slider
  const mainSlider = tns({
    container: "main.main div.main-slider",
    items: 1,
    nav: false,
    controls: false,
    axis: "vertical",
    autoplayDirection: "backward",
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayButton: false,
    autoplayButtonOutput: false,
    speed: 800,
    gutter: 300
  })

  // modals
  modalsInit(".button.button-order.button-design", ".popup-design");
  modalsInit(".button.button-order.button-consultation", ".popup-consultation");
  modalsInit(".fixed-gift", ".popup-gift", "block", () => {
    document.querySelector(".fixed-gift").remove();
  })

  // feedback forms
  feedbackFormInit(".popup-design form", feedbacksUrl, () => {
    const clickEvent = new CustomEvent("closeModal");
    document.querySelector(".popup-design").dispatchEvent(clickEvent);
  });
  feedbackFormInit(".popup-consultation form", feedbacksUrl, () => {
    const clickEvent = new CustomEvent("closeModal");
    document.querySelector(".popup-consultation").dispatchEvent(clickEvent);
  });

  // show more types of style portraits
  showMoreTypesOnClick(".styles#styles button", ".styles#styles div.hidden-lg.hidden-md.hidden-sm.hidden-xs.styles-2", "col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1");
})