import { fadeFirstPage } from "./fadeFirstPage.js";
import { secondPage } from "./dom.js";
import { nextPage, NextBotton } from "./changePage.js";
import { loginBackBtn, checkInput, showPassword } from "./login.js";

setTimeout(fadeFirstPage, 1000);

secondPage.addEventListener("click", nextPage);
document.body.addEventListener("click", NextBotton);
document.body.addEventListener("click", loginBackBtn);
document.body.addEventListener("input", checkInput);
document.body.addEventListener("click", showPassword);
