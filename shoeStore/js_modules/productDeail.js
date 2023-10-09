import { getProductsData } from "./get-data.js";
import { brandsEndpoint, userEndpoint } from "./util.js";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let selectedSize;
let shoeName = document.querySelector(".shoe-title");
let sold = document.querySelector(".sold-value");
let rate = document.querySelector(".rate-review");
let description = document.querySelector(".product-description");
let sizeSection = document.querySelector(".size-section");
let colorSection = document.querySelector(".color-section");

document.querySelector(".back-botton").addEventListener("click", () => {
  window.location.href = `http://127.0.0.1:5500/shoeStore/html/home.html`;
});
async function getproductById(id) {
  let result;
  try {
    const data = await getProductsData(brandsEndpoint);
    data.forEach((brand) => {
      brand.models.forEach((model) => {
        if (model.id == id) {
          result = model;
        }
      });
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function fillProductDetails() {
  try {
    let product = await getproductById(id);
    shoeName.textContent = product.name;
    sold.innerHTML = `${product.sold} sold`;
    rate.innerHTML = `${product.rate} (${product.reviews} Reviews)`;
    description.innerHTML = product.description;
  } catch (error) {
    console.log(error);
  }
}
function sizeClicked(e) {
  if (e.target.classList.contains("size-circle")) {
    selectedSize = e.target.textContent;
    changeSizeStyle();
    e.target.classList.add("bg-black", "text-white");
  }
}
function changeSizeStyle() {
  let sizeNode = document.querySelectorAll(".size-circle");
  sizeNode.forEach((node) => {
    node.classList.remove("bg-black", "text-white");
  });
}

async function createSizeSection() {
  let product = await getproductById(id);
  let size = [...product.sizes];
  size.sort((a, b) => parseInt(a) - parseInt(b));
  size.forEach((size) => {
    let sizeDiv = document.createElement("div");
    sizeDiv.classList.add("size-circle");
    sizeDiv.innerHTML = size;
    sizeSection.append(sizeDiv);
  });
}
async function createColorSection() {
  let product = await getproductById(id);
  let colors = [...product.colors];
  colors = colors.map((color) => color.toLowerCase());
  console.log(colors);
  colors.forEach((color) => {
    let colorDiv = document.createElement("div");
    if (color == "black") {
      colorDiv.classList.add("color-circle", `bg-${color}`);
    } else if (color == "white") {
      colorDiv.classList.add(
        "color-circle",
        `bg-${color}`,
        "border-2",
        "border-gray-600"
      );
    } else {
      colorDiv.classList.add("color-circle", `bg-${color}-600`);
      console.log(colorDiv.classList);
    }
    colorSection.append(colorDiv);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  fillProductDetails();
  createColorSection();
  createSizeSection();
});
document.addEventListener("click", sizeClicked);
