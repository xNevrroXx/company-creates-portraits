// third-side modules
import {tns} from "tiny-slider";
// own modules
import {modalsInit, modalOnScroll, modalOnTime, activateModal} from "./modules/modals";
import feedbackFormInit from "./modules/feedbackForm";
import showMoreTypesOnClick from "./modules/showMoreTypesOnClick";
import calcCostPortrait from "./modules/calcCostPortrait";
import tabs from "./modules/tabs";
import changeImageOnHover from "./modules/changeImageOnHover";
import initBurger from "./modules/initBurger";

const serverUrl = "http://localhost:9999";
const feedbacksUrl = `${serverUrl}/feedbacks`;
const promocodeStr = "IWANTPOPART";

window.addEventListener("DOMContentLoaded", () => {
  initBurger();

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

  const feedbackSlider = tns({
    container: ".feedback .feedback-slider",
    nav: false,
    prevButton: document.querySelector("button.main-slider-btn.main-prev-btn"),
    nextButton: document.querySelector("button.main-slider-btn.main-next-btn"),
    axis: "horizontal",
    autoplay: true,
    autoplayTimeout: 7500,
    autoplayButton: false,
    autoplayButtonOutput: false,
    speed: 1500,
    gutter: 300
  })

  // modals
  let isOpenModalFlag = false;
  modalsInit(".button.button-order.button-design", ".popup-design", "block", () => {
    isOpenModalFlag = true;
  }, () => {
    isOpenModalFlag = false;
  });
  modalsInit(".button.button-order.button-consultation", ".popup-consultation", "block", () => {
    isOpenModalFlag = true;
  }, () => {
    isOpenModalFlag = false;
  });
  modalsInit(".fixed-gift", ".popup-gift", "block", () => {
    isOpenModalFlag = true;
    document.querySelector(".fixed-gift").remove();
  }, () => {
    isOpenModalFlag = false;
  })
  // activate modal on time or on some event
  modalOnScroll(isOpenModalFlag);
  setTimeout(() => {
    if(!isOpenModalFlag)
      activateModal(".popup-consultation");
  }, 1000*20*1)

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
  feedbackFormInit("section.consultation form", feedbacksUrl);

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
        triggerTag: "li",
        contentTag: "div",
        trigger: "ul.portfolio-menu > li.all",
        content: ".portfolio-wrapper > .portfolio-block.all"
      },
      {
        name: "lovers",
        triggerTag: "li",
        contentTag: "div",
        trigger: "ul.portfolio-menu > li.lovers",
        content: ".portfolio-wrapper > .portfolio-block.all.lovers"
      },
      {
        name: "chef",
        triggerTag: "li",
        contentTag: "div",
        trigger: "ul.portfolio-menu > li.chef",
        content: ".portfolio-wrapper > .portfolio-block.all.chef"
      },
      {
        name: "girl",
        triggerTag: "li",
        contentTag: "div",
        trigger: "ul.portfolio-menu > li.girl",
        content: ".portfolio-wrapper > .portfolio-block.all.girl"
      },
      {
        name: "guy",
        triggerTag: "li",
        contentTag: "div",
        trigger: "ul.portfolio-menu > li.guy",
        content: ".portfolio-wrapper > .portfolio-block.all.guy"
      },
      {
        name: "grandmother",
        triggerTag: "li",
        contentTag: "div",
        trigger: "ul.portfolio-menu > li.grandmother",
        content: ".portfolio-wrapper > .portfolio-block.all.grandmother"
      },
      {
        name: "granddad",
        triggerTag: "li",
        contentTag: "div",
        trigger: "ul.portfolio-menu > li.granddad",
        content: ".portfolio-wrapper > .portfolio-block.all.granddad"
      }
    ]
  };
  tabs("section.portfolio", triggerContentMatchObj, 0);
  // accordion via tabs function === bad idea
  const triggerContentMatchObj2 = {
    wrapperTriggersSelector: "#accordion",
    wrapperContentSelector: "#accordion",
    matchSlices: [
      {
        name: "first-question",
        triggerTag: "p",
        contentTag: "div",
        trigger: "p.accordion-heading.first-question",
        content: "div.accordion-block.first-question"
      },
      {
        name: "second-question",
        triggerTag: "p",
        contentTag: "div",
        trigger: "p.accordion-heading.second-question",
        content: "div.accordion-block.second-question"
      },
      {
        name: "third-question",
        triggerTag: "p",
        contentTag: "div",
        trigger: "p.accordion-heading.third-question",
        content: "div.accordion-block.third-question"
      },
      {
        name: "fourth-question",
        triggerTag: "p",
        contentTag: "div",
        trigger: "p.accordion-heading.fourth-question",
        content: "div.accordion-block.fourth-question"
      },
    ]
  };
  tabs("section.often-questions", triggerContentMatchObj2, 0, "active", "hidden");

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