import { firstPage, secondPage } from "./dom.js";

export function fadeFirstPage() {
  // firstPage.classList.remove("flex", "flex-col");
  firstPage.style.display = "none";
  // secondPage.classList.add("slideRight");
  secondPage.classList.remove("hidden");
}
