import { updateScreen } from "./changePage.js";
import { screenData } from "./util.js";
export function loginBackBtn(e) {
  if (e.target.classList.contains("back-botton")) {
    updateScreen(screenData.length - 1);
  }
}
// password - input;
// email - input;
// signin-button
export function checkInput() {
  const password = document.querySelector(".password-input");
  const email = document.querySelector(".email-input");
  const signinBtn = document.querySelector(".signin-button");
  const passwordvalue = password.value;
  const emailValue = email.value;
  if (passwordvalue !== "" && email.value !== "") {
    signinBtn.classList.remove("bg-gray-400");
    signinBtn.classList.add("bg-black");
    signinBtn.disabled = false;
  } else {
    signinBtn.classList.add("bg-gray-400");
    signinBtn.classList.remove("bg-black");
  }
}
let passwordVisibile = false;
export function showPassword(e) {
  if (e.target.classList.contains("eye")) {
    const password = document.querySelector(".password-input");
    const eye = document.querySelector(".eye");
    if (!passwordVisibile) {
      eye.classList.remove("fa-eye-slash");
      eye.classList.add("fa-eye");
      password.type = "text";
    } else if (passwordVisibile) {
      eye.classList.add("fa-eye-slash");
      eye.classList.remove("fa-eye");
      password.type = "password";
    }
    passwordVisibile = !passwordVisibile;
  }
}
