/*global chrome*/
/* src/content.js */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import cssPath from "cssman";
import Gallery from "./components/Gallery";
import "./content.css";

function Main() {
  // const [isShow, setIsShow] = useState(false);
  const [selector, setSelector] = useState("");

  const events = [
    "click",
    "mousemove",
    "mouseleave",
    // "submit",
    "mouseup",
    "hover",
    "mouseover",
    "mouseenter",
    // "change",
    "focus",
    "focusout",
    "focusin",
    // "keydown",
    // "keypress",
    // "keyup",
    "scroll",
    "blur",
    "resize",
    "mouseout",
  ];

  const addEvent = (el, type, handler) => {
    if (el.attachEvent) el.attachEvent("on" + type, handler);
    else el.addEventListener(type, handler);
  };
  const removeEvent = (el, type, handler) => {
    if (el.detachEvent) el.detachEvent("on" + type, handler);
    else el.removeEventListener(type, handler, true);
  };

  let nodes = document.getElementById("root").getElementsByTagName("div");

  const handleEvent = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const removeTrigger = () => {
    nodes = document.getElementById("root").getElementsByTagName("div");

    for (let i = 0; i < nodes.length; i++) {
      events.forEach((item) => {
        removeEvent(nodes[i], item, handleEvent);
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      for (let i = 0; i < nodes.length; i++) {
        events.forEach((item) => {
          addEvent(nodes[i], item, handleEvent);
        });

        nodes[i].addEventListener("mouseenter", (event) => {
          for (let j = 0; j < nodes.length; j++) {
            if (nodes[j] && nodes[j].classList) {
              nodes[j].classList.remove("at-active");
            }
          }

          const eventTarget = event.currentTarget;

          if (eventTarget && eventTarget.classList) {
            eventTarget.classList.add("at-active");
          }
        });

        nodes[i].addEventListener("click", (event) => {
          event.stopPropagation();
          event.preventDefault();

          let selectorNode = cssPath(event.currentTarget);

          if (selectorNode) {
            selectorNode = selectorNode.replace(/\.at\-active/g, "");
          }

          console.log("selectorNode", selectorNode);

          setSelector(selectorNode);

          const eventTarget = event.currentTarget;

          if (eventTarget.style.position === "static") {
            eventTarget.style.position = "relative";
          }

          const clientRect = eventTarget.getBoundingClientRect();

          var top = window.pageYOffset || document.documentElement.scrollTop,
            left = window.pageXOffset || document.documentElement.scrollLeft;

          node.style.transform = `translate(${clientRect.x + left}px, ${
            clientRect.y + top + clientRect.height
          }px)`;
          node.style.display = "block";
        });

        nodes[i].addEventListener("mouseleave", (event) => {
          const eventTarget = event.currentTarget;
          eventTarget.classList.remove("at-active");
        });
      }

      let node = document.createElement("div");
      node.innerHTML = renderMenu();
      node.classList.add("at-menu-wrapper");
      node.style.width = "fit-content";
      node.style.zIndex = "10000";
      node.style.height = "fit-content";
      node.style.position = "absolute";
      node.style.display = "none";
      node.style.top = "0";

      document.body.appendChild(node);

      document
        .querySelector("#open-iframe-media-template")
        .addEventListener("click", () => {
          node.style.display = "none";
        });
    }, 1000);
  }, []);

  const renderMenu = () => {
    return `<div
        id="custom-edit-element-menu"
        class="custom-action-menu"
        data-menu-type="custom-edit-element-menu"
        style="display: flex;"
      >
        <span
          class="custom-action-menu-pointer"
          style="display: none; inset: -2px auto auto 15px;"
        ></span>
        <div data-target-tags="div|ul|ol|dl|dt|dd|table|th|tr|td|li" style="">
          +Add
          <div class="sub-menu">
            <div
              data-bind-menu="dom|show_add_html_popup"
              data-target-tags="all"
            >
              HTML
            </div>
            <div
              data-bind-menu="dom|show_add_image_popup"
              data-target-tags="all"
            >
              Image
            </div>
            <div
              data-bind-menu="dom|show_badge_popup"
              data-target-tags="all"
              data-hide-element="ins-custom-badge"
            >
              Badge
            </div>
            <div
              id="open-iframe-media-template"
              data-bind-menu="dom|show_badge_popup"
              data-target-tags="all"
              data-hide-element="ins-custom-badge"
            >
              Media Template
            </div>
          </div>
        </div>
        <div
          data-bind-menu="dom|edit_text"
          class="edit-text"
          data-target-tags="a|p|li|h1|h2|h3|h4|h5|h6|button|span|label|strong'"
          style="display: none;"
        >
          Edit Text
        </div>
        <div data-bind-menu="style|open_style_edit_mode" data-target-tags="all">
          style
        </div>
        <div data-bind-menu="dom|resize_mode" data-target-tags="all">
          resize
        </div>
        <div data-bind-menu="dom|move_mode" data-target-tags="all">
          move
        </div>
        <div
          data-bind-menu="dom|show_edit_link_popup"
          data-target-tags="a"
          style="display: none;"
        >
          <svg class="svg-icon icon-link"></svg>
        </div>
        <div data-bind-menu="dom|show_edit_html_popup" data-target-tags="all">
          <svg class="svg-icon icon-html"></svg>
        </div>
        <div data-bind-menu="dom|remove_element" data-target-tags="all">
          <svg class="svg-icon icon-delete"></svg>
        </div>
        <div data-target-tags="all">
          <svg class="svg-icon icon-dot"></svg>
          <div class="sub-menu">
            <div
              data-bind-menu="dom|show_edit_attributes_popup"
              data-target-tags="all"
            >
              Attributes
            </div>
            <div
              data-bind-menu="dom|show_edit_selector_popup"
              data-target-tags="all"
            >
              Element Selector
            </div>
          </div>
        </div>
        <span
          class="custom-action-menu-close-button"
          data-bind-menu="dom|custom_close_action_menu"
        >
          <svg class="svg-icon icon-close"></svg>
        </span>
      </div>`;
  };

  return (
    <>
      <Gallery selector={selector} removeTrigger={removeTrigger} />
    </>
  );
}

const app = document.createElement("div");
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === "clicked_browser_action") {
//     toggle();
//   }
// });

// function toggle() {
//   if (app.style.display === "none") {
//     app.style.display = "block";
//   } else {
//     app.style.display = "none";
//   }
// }
