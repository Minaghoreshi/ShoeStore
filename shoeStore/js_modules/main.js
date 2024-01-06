import { fadeFirstPage } from "./fadeFirstPage.js";
import { secondPage } from "./dom.js";
import { nextPage, NextBotton } from "./changePage.js";

setTimeout(fadeFirstPage, 1000);

secondPage.addEventListener("click", nextPage);
document.body.addEventListener("click", NextBotton);

// document.body.addEventListener("click", signinBtnClicked);
function myFunction() {
  console.log("clicked");
}
