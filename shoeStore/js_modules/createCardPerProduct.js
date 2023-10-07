import { getProductsData } from "./get-data.js";
import { productsWrapper, mostPopular, brandsScrollContainer } from "./dom.js";
import { brandsEndpoint, popularEndpoint } from "./util.js";

//reload page and all products are visible
export async function createCardPerProduct(value) {
  const allModels = await getProductsData(brandsEndpoint);
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
}
//click on most popular and popular product visible
export async function popularClick() {
  mostPopular.classList.add("text-red-600");
  try {
    const allModels = await getProductsData(brandsEndpoint);
    let allspans = brandsScrollContainer.querySelectorAll("span");
    allspans.forEach((span) => {
      span.classList.remove("select");
    });
    let popularIds = await getProductsData(popularEndpoint);
    let allModelsData = [];
    allModels.forEach((brand) => {
      allModelsData.push(...brand.models);
    });

    let result = allModelsData.filter((model) => popularIds.includes(model.id));
    console.log(result);
    productsWrapper.innerHTML = "";
    result.forEach((model) => {
      let product = document.createElement("div");
      product.classList.add("product");
      const html = `<div class="shoe-image">
  <img  src="${model.img[0]}" alt="image" class="shoe" />
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
//changing the scroll bar brands color
function changeSpanBackground(id) {
  let allspans = brandsScrollContainer.querySelectorAll("span");
  allspans.forEach((span) => {
    span.classList.remove("select");
  });
  let selectedSpann = brandsScrollContainer.querySelector(`#${id}`);
  selectedSpann.classList.add("select");
}
//hande different clicks on documet
export async function showProductsOfSelectedBrand(e) {
  console.log(e.target);
  let id = e.target.id;
  //click on brand name in the up of the page that redirect to another page
  if (
    e.target.classList.contains("category") ||
    e.target.parentNode.classList.contains("category")
  ) {
    redirectToBrandPage();
    console.log("clicked");
  } else if (
    e.target.parentNode.classList.contains("product") ||
    e.target.parentNode.classList.contains("shoe-image")
  ) {
    console.log("hey");
    redirectToProductDetailsPage();
  }
  //click on brands name on scroll bar that shows the selected brands products
  else if (e.target.parentNode.classList.contains("brand-scroll")) {
    changeSpanBackground(id);
    if (id == "all") {
      createCardPerProduct();
    } else {
      showSelectedBrandOfScrllBar(id);
    }
  }
}
export function redirectToProductDetailsPage() {
  console.log("show product Detail Page");
}
async function showSelectedBrandOfScrllBar(id) {
  let result = [];
  let allbrands = await getProductsData(brandsEndpoint);

  let selectedBrand = allbrands.find((brand) => brand.name == id);
  result.push(...selectedBrand.models);

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
}
async function redirectToBrandPage() {
  console.log("go to next page");
}
