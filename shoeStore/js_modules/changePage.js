import { secondPage } from "./dom.js";
import { screenData } from "./util.js";
import { loginHtmlPage } from "./innerHtml.js";
export let currentIndex = 0;
// function createLoginPage() {
//   document.body.innerHTML = "";
//   document.body.insertAdjacentHTML("beforeend", loginHtmlPage);
// }
export function nextPage() {
  secondPage.style.display = "none";
  updateScreen(currentIndex);
}
export function updateScreen(index) {
  document.body.innerHTML = "";
  if (currentIndex < screenData.length) {
    let currentScreen = screenData[index];
    const progressContainer = document.createElement("div");
    const container = document.createElement("div");
    container.classList.add("container", "flex", "flex-col");
    progressContainer.classList.add(
      "progress",
      "flex",
      "gap-1.5",
      "absolute",
      "bottom-[119px]",
      "left-[163px]"
    );
    screenData.forEach((screen, index) => {
      const progressBar = document.createElement("div");
      progressBar.classList.add("progressBar");
      if (index == currentIndex) {
        progressBar.style.backgroundColor = "#000";
      }
      progressContainer.insertAdjacentElement("beforeend", progressBar);
    });
    const html = `<div>
        <img
          src="${currentScreen.img}"
          alt="screen${index}-image"
        />
      </div>
      <div class="px-6 pt-8 text-center justify-center">
        <span class="text-3xl text-center justify-center"
          >${currentScreen.description}</span
        >
      </div>
      <div class="progress flex gap-1.5 absolute bottom-[119px] left-[163px]">
        <div class="progressBar"></div>
        <div class="progressBar"></div>
        <div class="progressBar"></div>
      </div>
      <div class="next-botton px-6">
        <button class="nextBtn">Next</button>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
    container.append(progressContainer);
    document.body.append(container);
    currentIndex++;
  } else if (currentIndex >= screenData.length) {
    window.location.href = `http://127.0.0.1:5500/html/login.html`;
  }
}
export function NextBotton(e) {
  if (e.target.classList.contains("nextBtn")) {
    updateScreen(currentIndex);
  }
}
