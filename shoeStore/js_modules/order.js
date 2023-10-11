import { getProductsData } from "./get-data.js";
import { brandsEndpoint } from "./util.js";
import { createOrderCart } from "./createOrderCart.js";
import { getAllOrders } from "./getAllOrders.js";
const container = document.querySelector(".container");
function createCarts(order, originOfOrder, orderIndex, text, st) {
  let orderCart = document.createElement("div");
  orderCart.classList.add("order-cart");
  const html = `<div class="order-image">
  <img src="${originOfOrder.img[0]}" alt="" />
</div>
<div class="flex flex-col gap-3">
  <span class="max-w-[155px] font-semibold line-clamp-1">${originOfOrder.name}</span>
  <div class="flex gap-1 items-center">
    <div class="rounded-full w-5 h-5 border border-gray-500 bg-${order.color}-400"></div>
    <span class="text-xs">${order.color}</span>
    <div class="bg-gray-400 w-[2px] h-4"></div>
    <span class="text-xs">Size = ${order.size}</span>
  </div>
  <span class="w-[90px] py-1 bg-gray-200 rounded-lg text-xs flex items-center justify-center ">${st}</span>
  <span class="price-${orderIndex} mt-4 text-base font-semibold">${order.totalPrice} $</span>
</div>
<div
  class="bg-black text-white text-sm absolute bottom-5 right-4 rounded-full px-5 py-2 flex items-center justify-center gap-5"
>
 ${text}
</div>`;
  orderCart.insertAdjacentHTML("beforeend", html);
  container.append(orderCart);
}

let active = document.querySelector(".active");
let complete = document.querySelector(".complete");
async function fillPage() {
  const brands = await getProductsData(brandsEndpoint);
  active.classList.remove("border-gray-300");
  active.classList.add("border-black");
  complete.classList.remove("border-black");
  let allModels = [];
  brands.forEach((brand) => {
    allModels.push(...brand.models);
  });
  let allOrders = await getAllOrders();

  const activeOrders = allOrders.filter((order) => order.stats === "active");
  let allPrice = activeOrders.map((order) => parseFloat(order.totalPrice));
  let totalPrice = allPrice
    .reduce((ac, cv) => {
      return ac + cv;
    }, 0)
    .toFixed(2);

  document.querySelector(".container").innerHTML = "";
  activeOrders.forEach((order, index) => {
    let originalOrderInfo = allModels.filter(
      (model) => model.id == parseInt(order.orderId)
    );
    createCarts(
      order,
      ...originalOrderInfo,
      index,
      "Track Order",
      "in delivery"
    );
  });
}
async function fillCompletePage() {
  const brands = await getProductsData(brandsEndpoint);
  complete.classList.remove("border-gray-300");
  complete.classList.add("border-black");
  active.classList.remove("border-black");
  let allModels = [];
  brands.forEach((brand) => {
    allModels.push(...brand.models);
  });
  let allOrders = await getAllOrders();

  const completeOrders = allOrders.filter(
    (order) => order.stats === "completed"
  );
  let allPrice = completeOrders.map((order) => parseFloat(order.totalPrice));

  let totalPrice = allPrice
    .reduce((ac, cv) => {
      return ac + cv;
    }, 0)
    .toFixed(2);

  document.querySelector(".container").innerHTML = "";
  completeOrders.forEach((order, index) => {
    let originalOrderInfo = allModels.filter(
      (model) => model.id == parseInt(order.orderId)
    );
    createCarts(
      order,
      ...originalOrderInfo,
      index,
      "Leave Review",
      "completed"
    );
  });
}
document.querySelector(".complete").addEventListener("click", fillCompletePage);
document.querySelector(".active").addEventListener("click", fillPage);

document.querySelector(".home-botton").addEventListener("click", () => {
  window.location.href = `http://127.0.0.1:5500/html/home.html`;
});
document.querySelector(".cart").addEventListener("click", () => {
  window.location.href = `http://127.0.0.1:5500/html/cart.html`;
});
document.addEventListener("DOMContentLoaded", fillPage);
