import MediaTemplatePopup from "../../assets/svg/media-template-popup.svg";
import MediaTemplateFloatingBar from "../../assets/svg/media-template-floating-bar.svg";
import MediaTemplateFullscreen from "../../assets/svg/media-template-fullscreen.svg";
import MediaTemplateInline from "../../assets/svg/media-template-inline.svg";
import MediaTemplateSlideIn from "../../assets/svg/media-template-slide-in.svg";
import MediaTemplateGamified from "../../assets/svg/media-template-gamified.svg";

export const token = "5474r2x214z254a4u2a4y494f4t5x2q5o4h4v2n4f5m5";
export const _user_id = "1600080515";
export const _account_id = "1600080515";

export const GALLERY = "gallery";
export const MY_TEMPLATE = "my_template";

export const TEMPLATE_TYPE = {
  [GALLERY]: {
    value: GALLERY,
    label: "Gallery",
  },
  [MY_TEMPLATE]: {
    value: MY_TEMPLATE,
    label: "My Template",
  },
};

export const LAYOUT_TEMPLATE = {
  pop_up: {
    id: 1,
    name: "pop_up",
    label: "Pop up",
    img: MediaTemplatePopup,
  },
  floating_bar: {
    id: 2,
    name: "floating_bar",
    label: "Floating bar",
    img: MediaTemplateFloatingBar,
  },
  full_screen: {
    id: 3,
    name: "full_screen",
    label: "Fullscreen",
    img: MediaTemplateFullscreen,
  },
  inline: {
    id: 4,
    name: "inline",
    label: "Inline",
    img: MediaTemplateInline,
  },
  slide_in: {
    id: 5,
    name: "slide_in",
    label: "Slide-in",
    img: MediaTemplateSlideIn,
  },
  gamified: {
    id: 6,
    name: "gamified",
    label: "Gamified",
    img: MediaTemplateGamified,
  },
};
