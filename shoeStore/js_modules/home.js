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
  productsWrapper,
} from "./dom.js";
import { createProductCard } from "./createProductCard.js";
const home = document.querySelector(".home-botton");
const allIcons = document.querySelectorAll("iconify-icon");
let allBrands = [];
let isMoreButtonVisible = true;
const brandsEndpoint = `http://localhost:3000/brands`;
let searchInput = document.querySelector(".search-bar");
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
  window.location.href = "http://127.0.0.1:5500/html/cart.html";
});
document.querySelector(".orders").addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/html/orders.html";
});
async function search() {
  closeSearch.classList.remove("hidden");
  document.querySelector(".brand-list").classList.add("hidden");
  document.querySelector(".most--popular").classList.add("hidden");
  document.querySelector(".brand-scroll").classList.add("hidden");
  productsWrapper.innerHTML = "";
  try {
    const allModels = await getProductsData(brandsEndpoint);
    let dataModels = [];
    allModels.forEach((brand) => {
      dataModels.push(...brand.models);
    });
    let searchValue = searchInput.value.toLowerCase();
    const filteredModels = dataModels.filter((model) =>
      model.name.toLowerCase().includes(searchValue)
    );

    if (filteredModels.length === 0) {
      productsWrapper.innerHTML = `<div
      class="flex flex-col w-[50%] left-[100px] top-[100px] absolute justify-center items-center"
    >
      <img
        src="../backgrounds/not-found-no-result-image-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
        alt=""
      />
      <span class="text-xl font-bold">Sorry</span>
      <span class="text-center"
        >the keyword you enterd can not be found</span
      >
    </div>`;
    } else {
      createProductCard(filteredModels);
    }
  } catch (error) {
    console.log(error);
  }
}

async function refillPage() {
  closeSearch.classList.add("hidden");
  document.querySelector(".brand-list").classList.remove("hidden");
  document.querySelector(".most--popular").classList.remove("hidden");
  document.querySelector(".brand-scroll").classList.remove("hidden");
  createCardPerProduct();
  searchInput.value = "";
}
let closeSearch = document.querySelector(".x-mark");
closeSearch.addEventListener("click", refillPage);
const debouncedSearch = _.debounce(search, 1000);
// searchInput.addEventListener("blur", refillPage);
searchInput.addEventListener("input", debouncedSearch);
