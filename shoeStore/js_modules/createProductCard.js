import { productsWrapper } from "./dom.js";
export function createProductCard(arr) {
  productsWrapper.innerHTML = "";
  arr.forEach((model) => {
    let product = document.createElement("div");
    product.classList.add("product");
    const html = `<div class="shoe-image">
<img id="${model.id}" src="${model.img[0]}" alt="" />
</div>
<span class="shoe-name">${model.name}</span>
<span>${model.price}</span>`;
    product.insertAdjacentHTML("beforeend", html);
    productsWrapper.append(product);
  });
}
