import { getProductsData } from "./get-data.js";
import { productsWrapper, mostPopular, brandsScrollContainer } from "./dom.js";
import { brandsEndpoint, popularEndpoint } from "./util.js";
import { createProductCard } from "./createProductCard.js";

//reload page and all products are visible
export async function createCardPerProduct() {
  const allModels = await getProductsData(brandsEndpoint);
  productsWrapper.innerHTML = "";
  let dataModels = [];
  allModels.forEach((brand) => {
    dataModels.push(...brand.models);
  });
  dataModels.sort(() => Math.random() - 0.5);

  try {
    createProductCard(dataModels);
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

    createProductCard(result);
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
  let id = e.target.id;
  //click on brand name in the up of the page that redirect to another page
  if (
    e.target.classList.contains("category") ||
    e.target.parentNode.classList.contains("category")
  ) {
    redirectToBrandPage(id);
    console.log(e.target.id);
    console.log(id);
  } else if (
    e.target.parentNode.classList.contains("product") ||
    e.target.parentNode.classList.contains("shoe-image")
  ) {
    console.log(e.target);
    redirectToProductDetailsPage(id);
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
export function redirectToProductDetailsPage(id) {
  console.log("show product Detail Page");
  window.location.href = `http://127.0.0.1:5500/shoeStore/html/productDetail.html?id=${id}`;
}
async function showSelectedBrandOfScrllBar(id) {
  let result = [];
  let allbrands = await getProductsData(brandsEndpoint);

  let selectedBrand = allbrands.find((brand) => brand.name == id);
  result.push(...selectedBrand.models);
  createProductCard(result);
}
async function redirectToBrandPage(id) {
  window.location.href = `http://127.0.0.1:5500/shoeStore/html/brand.html?brand=${id}`;
}
