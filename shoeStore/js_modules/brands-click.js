// import { getProductsData } from "./get-data.js";
// import { brandsEndpoint } from "./util.js";
// import { productsWrapper, brandsScrollContainer } from "./dom.js";
// import {
//   createCardPerProduct,
//   mostPopularSelected,
//   popularClick,
// } from "./createCardPerProduct.js";
// function changeSpanBackground(id) {
//   let allspans = brandsScrollContainer.querySelectorAll("span");
//   allspans.forEach((span) => {
//     span.classList.remove("select");
//   });
//   let selectedSpann = brandsScrollContainer.querySelector(`#${id}`);
//   selectedSpann.classList.add("select");
// }

// export async function showProductsOfSelectedBrand(e) {
//   console.log(e.target);
//   if (
//     e.target.classList.contains("category") ||
//     e.target.parentNode.classList.contains("category")
//   ) {
//     console.log("go to next page");
//   } else if (e.target.parentNode.classList.contains("brand-scroll")) {
//     let id = e.target.id;
//     changeSpanBackground(id);
//     if (id == "all") {
//       createCardPerProduct();
//     } else {
//       let result = [];
//       let allbrands = await getProductsData(brandsEndpoint);

//       let selectedBrand = allbrands.find((brand) => brand.name == id);
//       result.push(...selectedBrand.models);

//       productsWrapper.innerHTML = "";
//       result.forEach((model) => {
//         let product = document.createElement("div");
//         product.classList.add("product");
//         const html = `<div class="shoe-image">
//       <img src="${model.img[0]}" alt="" />
//       </div>
//       <span class="shoe-name">${model.name}</span>
//       <span>${model.price}</span>`;
//         product.insertAdjacentHTML("beforeend", html);
//         productsWrapper.append(product);
//       });
//     }
//   } else if (
//     e.target.parentNode.classList.contains("product") ||
//     e.target.parentNode.classList.contains("shoe-image")
//   ) {
//     console.log("go to product detail page");
//   }
// }
