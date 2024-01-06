import { productsWrapper } from "./dom.js";
export function createProductCard(arr) {
  productsWrapper.innerHTML = "";
  arr.forEach((model) => {
    let product = document.createElement("div");
    product.classList.add("product");
    product.setAttribute("id", model.id);
    const html = `<div class="shoe-image">
<img id="${model.id}" src="${model.img[0]}" alt="" />
</div>
<span id="${model.id}" class="shoe-name">${model.name}</span>
<span id="${model.id}">${model.price}</span>`;
    product.insertAdjacentHTML("beforeend", html);
    productsWrapper.append(product);
  });
}
