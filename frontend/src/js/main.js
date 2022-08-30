// third-side modules
import {tns} from "tiny-slider";
// own modules
import {modalsInit} from "./modules/modals";
import feedbackFormInit from "./modules/feedbackForm";

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
})