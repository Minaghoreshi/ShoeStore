import { getProductsData } from "./get-data.js";
import { productsWrapper, mostPopular } from "./dom.js";
let mostPopularSelected = false;
let brandsEndpoint = `http://localhost:3000/brands`;
let popularEndpoint = `  http://localhost:3000/most-popular`;
// export async function getAllModels(url) {
//   let res = await getProductsData(url);
//   // let data = await res.json();
//   // return data;
// }

export async function createCardPerProduct() {
  const allModels = await getProductsData(brandsEndpoint);
  if (!mostPopularSelected) {
    productsWrapper.innerHTML = "";
    let dataModels = [];
    allModels.forEach((brand) => {
      dataModels.push(...brand.models);
    });
    dataModels.sort(() => Math.random() - 0.5);

    try {
      dataModels.forEach((model) => {
        let product = document.createElement("div");
        product.classList.add("product");
        const html = `<div class="shoe-image">
    <img src="${model.img[0]}" alt="" />
  </div>
  <span class="shoe-name">${model.name}</span>
  <span>${model.price}</span>`;
        product.insertAdjacentHTML("beforeend", html);
        productsWrapper.append(product);
      });
    } catch (error) {
      console.log(error);
    }
  } else if (mostPopularSelected) {
    try {
      let popularIds = await getProductsData(popularEndpoint);
      let allModelsData = [];
      allModels.forEach((brand) => {
        allModelsData.push(...brand.models);
      });
      console.log(allModelsData);

      let result = allModelsData.filter((model) =>
        popularIds.includes(model.id)
      );
      console.log(result);
      productsWrapper.innerHTML = "";
      result.forEach((model) => {
        let product = document.createElement("div");
        product.classList.add("product");
        const html = `<div class="shoe-image">
    <img src="${model.img[0]}" alt="" />
  </div>
  <span class="shoe-name">${model.name}</span>
  <span>${model.price}</span>`;
        product.insertAdjacentHTML("beforeend", html);
        productsWrapper.append(product);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function popularClick() {
  mostPopular.classList.toggle("text-red-600");
  mostPopularSelected = !mostPopularSelected;
  createCardPerProduct();
  console.log(mostPopularSelected);
}
