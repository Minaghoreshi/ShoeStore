import { getProductsData } from "./get-data.js";
import { brandsEndpoint } from "./util.js";
import { createProductCard } from "./createProductCard.js";
const brandName = document.querySelector(".brand-name");
export const urlParams = new URLSearchParams(window.location.search);
export const brand = urlParams.get("brand");
async function createBrandPage() {
  brandName.textContent = brand;
  try {
    let result = [];
    let data = await getProductsData(brandsEndpoint);
    let selectedBrand = data.find((data) => data.name == brand);
    result.push(...selectedBrand.models);
    createProductCard(result);
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener("DOMContentLoaded", createBrandPage);
document.querySelector(".back-botton").addEventListener("click", () => {
  window.location.href = `http://127.0.0.1:5500/html/home.html`;
});
