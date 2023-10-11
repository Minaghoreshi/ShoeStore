import { getProductsData } from "./get-data.js";
import { brandsEndpoint } from "./util.js";
import { createOrderCart } from "./createOrderCart.js";
import { getAllOrders } from "./getAllOrders.js";
let active = document.querySelector(".active");
let complete = document.querySelector(".complete");
async function fillPage() {
  const brands = await getProductsData(brandsEndpoint);
  active.classList.remove("border-gray-300");
  active.classList.add("border-black");
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

  activeOrders.forEach((order, index) => {
    let originalOrderInfo = allModels.filter(
      (model) => model.id == parseInt(order.orderId)
    );
    document.querySelector(".container").innerHTML = "";
    createOrderCart(order, ...originalOrderInfo, index);
  });
}
async function fillCompletePage() {
  const brands = await getProductsData(brandsEndpoint);
  active.classList.remove("border-gray-300");
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

  completeOrders.forEach((order, index) => {
    let originalOrderInfo = allModels.filter(
      (model) => model.id == parseInt(order.orderId)
    );
    document.querySelector(".container").innerHTML = "";
    createOrderCart(order, ...originalOrderInfo, index);
  });
}
document.querySelector(".complete").addEventListener("click", fillCompletePage);
document.querySelector(".active").addEventListener("click", fillPage);

document.addEventListener("DOMContentLoaded", fillPage);
