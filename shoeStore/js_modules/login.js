import { updateScreen } from "./changePage.js";
import { screenData } from "./util.js";
import { getDatabyEmail } from "./get-user.js";
import {
  backBtn,
  password,
  email,
  signinBtn,
  eye,
  form,
  passwordAlert,
} from "./dom.js";
export function loginBackBtn() {
  console.log("clicked");
  window.location.href = `http://127.0.0.1:5500/shoeStore/html/index.html`;
}

export async function checkInput() {
  let passwordvalue = password.value;
  let emailValue = email.value;
  if (passwordvalue !== "" && emailValue !== "") {
    signinBtn.classList.remove("bg-gray-400");
    signinBtn.classList.add("bg-black");
    signinBtn.disabled = false;
  } else {
    signinBtn.classList.add("bg-gray-400");
    signinBtn.classList.remove("bg-black");
  }
  if (emailValue != "") {
    let user = await getDatabyEmail(emailValue);
    if (user && user.remember === "on") {
      signinBtn.classList.remove("bg-gray-400");
      signinBtn.classList.add("bg-black");
      signinBtn.disabled = false;
      let pass = user.password;
      console.log(pass);
      document
        .querySelector(".remember-checkbox")
        .setAttribute("checked", "checked");
      password.value = pass;
    }
  }
}
let passwordVisibile = false;
export function showPassword(e) {
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

export async function signinBtnClicked(e) {
  if (password.value !== "" && email.value !== "") {
    e.preventDefault();
    const form = document.querySelector(".sign-in-form");
    const formData = Object.fromEntries(new FormData(form).entries());
    let user = await getDatabyEmail(formData.email);
    if (formData.password != user.password) {
      passwordAlert.classList.remove("hidden");
    } else if (formData.password === user.password) {
      console.log("correct");
      passwordAlert.classList.add("hidden");
      window.location.href = "http://127.0.0.1:5500/shoeStore/html/home.html";
    }
    console.log(user);
  }
}
function addBaseUrl() {
  const currentUrl = window.location.href;
  const desiredBaseUrl = "http://127.0.0.1:5500/shoeStore/html/login.html";

  if (currentUrl !== desiredBaseUrl) {
    window.history.replaceState({}, "", desiredBaseUrl);
  }
}
backBtn.addEventListener("click", loginBackBtn);
form.addEventListener("input", checkInput);
eye.addEventListener("click", showPassword);
signinBtn.addEventListener("click", signinBtnClicked);
document.addEventListener("DOMContentLoaded", addBaseUrl);
// getDatabyEmail("ghoreishi45@gmail.com");
