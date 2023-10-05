import { getProductsData } from "./get-data.js";
import { productsWrapper } from "./dom.js";
let allmodelsurl = `http://localhost:3000/brands`;
export async function getAllModels(url) {
  let data = await getProductsData(url);

  let dataModels = [];
  data.forEach((brand) => {
    dataModels.push(...brand.models);
  });
  dataModels.sort(() => Math.random() - 0.5);
  return dataModels;
}

export async function createCardPerProduct() {
  const allModels = await getAllModels(allmodelsurl);

  try {
    allModels.forEach((model) => {
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
