// third-side modules
import {tns} from "tiny-slider";
// own modules
import {modalsInit} from "./modules/modals";
import feedbackFormInit from "./modules/feedbackForm";
import showMoreTypesOnClick from "./modules/showMoreTypesOnClick";
import calcCostPortrait from "./modules/calcCostPortrait";
import tabs from "./modules/tabs";
import changeImageOnHover from "./modules/changeImageOnHover";

const serverUrl = "http://localhost:9999";
const feedbacksUrl = `${serverUrl}/feedbacks`;
const promocodeStr = 'IWANTPOPART';

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

  // init calc area
  calcCostPortrait("section.calc form", promocodeStr);

  // feedback forms
  feedbackFormInit(".popup-design form", feedbacksUrl, () => {
    const clickEvent = new CustomEvent("closeModal");
    document.querySelector(".popup-design").dispatchEvent(clickEvent);
  });
  feedbackFormInit(".popup-consultation form", feedbacksUrl, () => {
    const clickEvent = new CustomEvent("closeModal");
    document.querySelector(".popup-consultation").dispatchEvent(clickEvent);
  });
  feedbackFormInit("section.calc form", feedbacksUrl, () => {}, promocodeStr);

  // show more types of style portraits
  showMoreTypesOnClick(".styles#styles button", ".styles#styles div.hidden-lg.hidden-md.hidden-sm.hidden-xs.styles-2", "col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1");

  // tabs
  const triggerContentMatchObj = {
    wrapperTriggersSelector: "ul.portfolio-menu",
    wrapperContentSelector:  ".portfolio-wrapper",
    reserveContent: ".portfolio-no",
    matchSlices: [
      {
        name: "all",
        trigger: "ul.portfolio-menu > li.all",
        content: ".portfolio-wrapper > .portfolio-block.all.all"
      },
      {
        name: "lovers",
        trigger: "ul.portfolio-menu > li.lovers",
        content: ".portfolio-wrapper > .portfolio-block.all.lovers"
      },
      {
        name: "chef",
        trigger: "ul.portfolio-menu > li.chef",
        content: ".portfolio-wrapper > .portfolio-block.all.chef"
      },
      {
        name: "girl",
        trigger: "ul.portfolio-menu > li.girl",
        content: ".portfolio-wrapper > .portfolio-block.all.girl"
      },
      {
        name: "guy",
        trigger: "ul.portfolio-menu > li.guy",
        content: ".portfolio-wrapper > .portfolio-block.all.guy"
      },
      {
        name: "grandmother",
        trigger: "ul.portfolio-menu > li.grandmother",
        content: ".portfolio-wrapper > .portfolio-block.all.grandmother"
      },
      {
        name: "granddad",
        trigger: "ul.portfolio-menu > li.granddad",
        content: ".portfolio-wrapper > .portfolio-block.all.granddad"
      }
    ]
  };
  tabs("section.portfolio", triggerContentMatchObj, 0);

  // other
  const imagesMatchArr = [
    {
      name: "size-1",
      plugSrc: "assets/img/sizes-1.png",
      originalImg: "assets/img/sizes-1-1.png"
    },
    {
      name: "size-2",
      plugSrc: "assets/img/sizes-2.png",
      originalImg: "assets/img/sizes-2-1.png"
    },
    {
      name: "size-3",
      plugSrc: "assets/img/sizes-3.png",
      originalImg: "assets/img/sizes-3-1.png"
    },
    {
      name: "size-4",
      plugSrc: "assets/img/sizes-4.png",
      originalImg: "assets/img/sizes-4-1.png"
    },
  ]
  changeImageOnHover("section.sizes .sizes-wrapper", imagesMatchArr);
})