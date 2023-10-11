import { brandsEndpoint } from "./util.js";
import { getProductsData } from "./get-data.js";
import { createOrderCart } from "./createOrderCart.js";
import { getAllOrders } from "./getAllOrders.js";
import { updateUserOrders } from "./updateUserOrder.js";
let cartTotalPrice = document.querySelector(".price");
function fillTotalPrice(value) {
  cartTotalPrice.innerHTML = `$ ${value}`;
}
let modal = document.querySelector(".modal");
let modalCart = document.querySelector(".modal-order-cart");
let overlay = document.querySelector(".overlay");
async function fillPage() {
  const brands = await getProductsData(brandsEndpoint);

  let allModels = [];
  brands.forEach((brand) => {
    allModels.push(...brand.models);
  });
  let allOrders = await getAllOrders();

  let allPrice = allOrders.map((order) => parseFloat(order.totalPrice));

  let totalPrice = allPrice
    .reduce((ac, cv) => {
      return ac + cv;
    }, 0)
    .toFixed(2);

  fillTotalPrice(totalPrice);
  allOrders.forEach((order, index) => {
    let originalOrderInfo = allModels.filter(
      (model) => model.id == parseInt(order.orderId)
    );

    createOrderCart(order, ...originalOrderInfo, index);
  });
}
async function changeQuantity(
  e,
  operator,
  selectedIndex,
  selectedOrder,
  allOrders
) {
  //get the old quantity using DOM
  let quantity = parseInt(
    document.querySelector(`.quantity-${selectedIndex}`).innerHTML
  );
  let newOrderTotalPrice;
  //get the clicked order total price from DOM
  let orderTotalPrice = parseFloat(
    document.querySelector(`.price-${selectedIndex}`).innerHTML
  );
  //calculate the base price using quantty and total
  let basePrice = orderTotalPrice / quantity;
  if (operator == "+") {
    quantity++;
    newOrderTotalPrice = (orderTotalPrice + basePrice).toFixed(2);
    document.querySelector(
      `.price-${selectedIndex}`
    ).innerHTML = `${newOrderTotalPrice} $`;
    let newCartTotalPrice = (
      parseFloat(cartTotalPrice.innerHTML.split(" ")[1]) + basePrice
    ).toFixed(2);
    cartTotalPrice.innerHTML = `$ ${newCartTotalPrice}`;
  } else if (operator == "-" && quantity > 0) {
    quantity--;
    newOrderTotalPrice = (orderTotalPrice - basePrice).toFixed(2);
    document.querySelector(
      `.price-${selectedIndex}`
    ).innerHTML = `${newOrderTotalPrice} $`;
    let newCartTotalPrice = (
      parseFloat(cartTotalPrice.innerHTML.split(" ")[1]) - basePrice
    ).toFixed(2);
    cartTotalPrice.innerHTML = `$ ${newCartTotalPrice}`;
  }
  selectedOrder.quantity = quantity;
  selectedOrder.totalPrice = newOrderTotalPrice;
  console.log(selectedOrder);

  allOrders.splice(selectedIndex, 0, selectedOrder);
  let quantitytext = document.querySelector(`.quantity-${selectedIndex}`);
  quantitytext.textContent = quantity;
  updateUserOrders(allOrders);
}
let allOrders = [];
async function fillAllOrders() {
  let data = await getAllOrders();

  allOrders.push(...data);
}
fillAllOrders();
async function clickHandle(e) {
  // console.log(e.target.parentNode);
  if (
    e.target.classList.contains("increase") ||
    e.target.classList.contains("decrease")
  ) {
    let selectedIndex = e.target.id.split("-")[1];
    let selectedOrder = allOrders[selectedIndex];
    allOrders.splice(selectedIndex, 1);
    console.log(allOrders);
    if (e.target.innerHTML === "+") {
      changeQuantity(e, "+", selectedIndex, selectedOrder, allOrders);
      console.log(allOrders);
    } else if (e.target.innerHTML === "-") {
      changeQuantity(e, "-", selectedIndex, selectedOrder, allOrders);
      console.log(allOrders);
    }
    updateUserOrders(allOrders);
  } else if (e.target.parentNode.classList.contains("home-botton")) {
    window.location.href = `http://127.0.0.1:5500/shoeStore/html/home.html`;
  } else if (e.target.parentNode.classList.contains("trash")) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    let selectedIndex = e.target.parentNode.id.split("-")[1];
    let selectedOrder = allOrders[selectedIndex];
    const brands = await getProductsData(brandsEndpoint);
    let allModels = [];
    brands.forEach((brand) => {
      allModels.push(...brand.models);
    });
    const matchingModel = allModels.find(
      (model) => model.id === parseInt(selectedOrder.orderId)
    );
    modal.innerHTML = "";
    modal.innerHTML = ` <span class="text-xl font-semibold">Remove from Cart?</span>
    <div class="h-[2px] w-full my-5 bg-gray-100"></div> <div class="order-cart modal-order-cart">  <div class="bg-gray-100 rounded-3xl w-32 h-128">
    <img src="${matchingModel.img[0]}" alt="" />
  </div>
  <div class="flex flex-col gap-3">
    <span>${matchingModel.name}</span>
    <div class="flex gap-1 items-center">
      <div class="rounded-full w-5 h-5 border-gray-500 bg-${selectedOrder.color}-400"></div>
      <span class="text-xs">${selectedOrder.color}</span>
      <div class="bg-gray-400 w-[2px] h-4"></div>
      <span class="text-xs">Size = ${selectedOrder.size}</span>
    </div>
    <span class="mt-4 text-base font-semibold">${selectedOrder.totalPrice}</span>
  </div>
 
  <div
    class="bg-gray-100 absolute bottom-5 right-4 rounded-full px-5 py-2 flex items-center justify-center gap-5"
  >
    <button class="increase text-2xl">+</button>
    <span class="quantity">${selectedOrder.quantity}</span>
    <button class="decrease text-2xl">-</button>
  </div></div> 
  <div class="flex gap-3" id="id-${selectedIndex}">
  <button
    class="cancel w-44 text-black font-semibold bg-gray-200 justify-center rounded-full py-3 flex gap-3"
  >
    cancel
  </button>
  <button
    class="remove w-44 text-white font-semibold bg-black rounded-full py-3 flex justify-center gap-3"
  >
    Yes, remove
  </button>
</div>`;
  } else if (e.target.classList.contains("cancel")) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  } else if (e.target.classList.contains("remove")) {
    console.log("remove");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    let selectedIndex = e.target.parentNode.id.split("-")[1];
    let selectedOrder = allOrders[selectedIndex];
    console.log(selectedOrder.quantity);
    selectedOrder.quantity = 0;

    updateUserOrders(allOrders);
  } else if (
    e.target.parentNode.classList.contains("checkout") ||
    e.target.classList.contains("checkout")
  ) {
    window.location.href = `http://127.0.0.1:5500/shoeStore/html/checkout.html`;
  }
}

document.addEventListener("DOMContentLoaded", fillPage);
document.addEventListener("click", clickHandle);
