import { fadeFirstPage } from "./fadeFirstPage.js";
import { secondPage } from "./dom.js";
import { nextPage } from "./nextPage.js";
setTimeout(fadeFirstPage, 1000);

secondPage.addEventListener("click", nextPage);
