import { getProductsData } from "./get-data.js";
import {
  createCardPerProduct,
  popularClick,
  showProductsOfSelectedBrand,
} from "./brandsClick.js";
import {
  brandListContainer,
  moreBtn,
  brandsScrollContainer,
  allBrand,
  mostPopular,
} from "./dom.js";
const home = document.querySelector(".home-botton");
const allIcons = document.querySelectorAll("iconify-icon");
let allBrands = [];
let isMoreButtonVisible = true;
const brandsEndpoint = `http://localhost:3000/brands`;
//need to be completed for changing the color of icons
function whitenIconsBackgroundColor() {
  console.log(allIcons);
  allIcons.forEach((icon) => {
    icon.classList.add("text-black");
  });
}
// whitenIconsBackgroundColor();

function createEachBrandCircle(data) {
  const moreBtn = document.getElementById("moreBrand");

  let brand = document.createElement("div");
  brand.classList.add("brand");
  let html = `<div class="brand" >
  <div class="brand-logo category" id="${data.name}">
            <img src=${data.src} alt="" id="${data.name}" />
          </div>
          <span>${data.name}</span> </div>
  `;
  brand.insertAdjacentHTML("afterbegin", html);
  brandListContainer.append(brand);
  brandListContainer.insertBefore(brand, moreBtn);
  // brandListContainer.insertAdjacentHTML("afterbegin", html);
}
function createVisibleBrandsCircle(firstIndex, lastIndex) {
  // brandListContainer.innerHTML = "";
  for (let i = firstIndex; i < lastIndex; i++) {
    createEachBrandCircle(allBrands[i]);
  }
}

function createBrandScrollBars() {
  allBrands.forEach((brand) => {
    let brandspan = document.createElement("span");
    brandspan.setAttribute("id", brand.name);
    brandspan.textContent = brand.name;
    brandsScrollContainer.append(brandspan);
  });
}
async function fillBrandsList(endpoint) {
  try {
    allBrands = await getProductsData(endpoint);
    if (allBrands.length > 7) {
      createVisibleBrandsCircle(0, 7);
      moreBtn.classList.remove("hidden");
    } else createVisibleBrandsCircle(0, allBrands.length - 1);
    createBrandScrollBars();
  } catch (error) {
    console.log(error);
  }
}

function moreBtnClick() {
  if (isMoreButtonVisible) {
    createVisibleBrandsCircle(7, allBrands.length);
    moreBtn.innerHTML = `<div class="brand-logo">
    <span>Back</span>
  </div>
  <span>Back..</span>`;
  } else if (!isMoreButtonVisible) {
    brandListContainer.innerHTML = "";
    const html = ` <div class="brand " id="moreBrand">
    <div class="brand-logo">
    <span>More</span>
    </div>
    <span>More..</span>
    </div>`;
    brandListContainer.insertAdjacentHTML("afterbegin", html);
    createVisibleBrandsCircle(0, 7);
    const moreBtn = document.getElementById("moreBrand");
    moreBtn.addEventListener("click", moreBtnClick);
  }
  isMoreButtonVisible = !isMoreButtonVisible;
}
moreBtn.addEventListener("click", moreBtnClick);
document.addEventListener("DOMContentLoaded", fillBrandsList(brandsEndpoint));
document.addEventListener("DOMContentLoaded", createCardPerProduct);
mostPopular.addEventListener("click", popularClick);
document.addEventListener("click", showProductsOfSelectedBrand);
document
  .querySelector(".home-botton")
  .addEventListener("click", createCardPerProduct);
document.querySelector(".cart").addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/shoeStore/html/cart.html";
});
