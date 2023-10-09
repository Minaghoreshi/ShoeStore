import { secondPage } from "./dom.js";
import { screenData } from "./util.js";
export let currentIndex = 0;

export function nextPage() {
  secondPage.style.display = "none";
  updateScreen(currentIndex);
}
export function updateScreen(value) {
  currentIndex = value;
  document.body.innerHTML = "";
  if (value < screenData.length) {
    let currentScreen = screenData[value];
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
    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    buttonContainer.append(button);
    buttonContainer.classList.add("next-botton", "px-6");
    button.classList.add("nextBtn");
    button.textContent = "Next";
    screenData.forEach((screen, index) => {
      const progressBar = document.createElement("div");
      progressBar.classList.add("progressBar");
      if (index == value) {
        progressBar.style.backgroundColor = "#000";
      }

      progressContainer.insertAdjacentElement("beforeend", progressBar);
    });
    const html = `<div>
        <img
          src="${currentScreen.img}"
          alt="screen${value}-image"
        />
      </div>
      <div class="px-6 pt-8 text-center justify-center">
        <span class="text-3xl text-center justify-center"
          >${currentScreen.description}</span
        >
      </div>
      
     
    `;
    container.insertAdjacentHTML("beforeend", html);
    container.append(progressContainer);
    container.append(buttonContainer);
    document.body.append(container);

    currentIndex++;
    if (value == screenData.length - 1) {
      button.textContent = "Start";
    }
  } else if (value >= screenData.length) {
    window.location.assign("http://127.0.0.1:5500/shoeStore/html/login.html");
  }
}

export function NextBotton(e) {
  if (e.target.classList.contains("nextBtn")) {
    updateScreen(currentIndex);
  }
}
