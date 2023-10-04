import { getProductsData } from "./get-data.js";
import {
  brandListContainer,
  moreBtn,
  brandsScrollContainer,
  allBrand,
} from "./dom.js";
let allBrands = [];
let isMoreButtonVisible = true;
const brandsEndpoint = `http://localhost:3000/brands`;
function createEachBrandCircle(data) {
  let brand = document.createElement("div");
  brand.classList.add("brand");
  let html = `
  <div class="brand-logo">
            <img src=${data.src} alt="" />
          </div>
          <span>${data.name}</span>
  `;
  brand.insertAdjacentHTML("afterbegin", html);
  brandListContainer.append(brand);
  brandListContainer.insertBefore(brand, moreBtn);
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
    brandspan.textContent = brand.name;
    brandsScrollContainer.append(brandspan);
  });
}
async function fillBrandsList(endpoint) {
  try {
    allBrands = await getProductsData(endpoint);
    console.log(allBrands);
    if (allBrands.length > 7) {
      createVisibleBrandsCircle(0, 7);
      moreBtn.classList.remove("hidden");
    } else createVisibleBrandsCircle(0, allBrands.length - 1);
    createBrandScrollBars();
  } catch (error) {
    console.log(error);
  }
}
moreBtn.addEventListener("click", () => {
  if (isMoreButtonVisible) {
    createVisibleBrandsCircle(7, allBrands.length);
    moreBtn.innerHTML = `<div class="brand-logo">
    <span>Back</span>
  </div>
  <span>Back..</span>`;
  } else if (!isMoreButtonVisible) {
    // brandListContainer.innerHTML = "";
    location.reload();
  }
  isMoreButtonVisible = !isMoreButtonVisible;
});
document.addEventListener("DOMContentLoaded", fillBrandsList(brandsEndpoint));
