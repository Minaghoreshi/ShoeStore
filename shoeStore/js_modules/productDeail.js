import { getProductsData } from "./get-data.js";
import { brandsEndpoint, userEndpoint } from "./util.js";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let shoeName = document.querySelector(".shoe-title");
let sold = document.querySelector(".sold-value");
let rate = document.querySelector(".rate-review");
let description = document.querySelector(".product-description");

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
document.addEventListener("DOMContentLoaded", fillProductDetails());
