import { brandsEndpoint } from "./util.js";
import { getProductsData } from "./get-data.js";
import { createOrderCart } from "./createOrderCart.js";
import { getAllOrders } from "./getAllOrders.js";
import { updateUserOrders } from "./updateUserOrder.js";
let cartTotalPrice = document.querySelector(".price");
function fillTotalPrice(value) {
  cartTotalPrice.innerHTML = `$ ${value}`;
}

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
async function clickForQuantity(e) {
  console.log(e.target);
  if (
    e.target.classList.contains("increase") ||
    e.target.classList.contains("decrease")
  ) {
    let selectedIndex = e.target.id.split("-")[1];

    let selectedOrder = allOrders[selectedIndex];
    //remove the selected order from all orders for changing
    allOrders.splice(selectedIndex, 1);
    console.log(allOrders);
    if (e.target.innerHTML === "+") {
      changeQuantity(e, "+", selectedIndex, selectedOrder, allOrders);
      console.log(allOrders);
      // updateUserOrders(allOrders);
    } else if (e.target.innerHTML === "-") {
      // let selectedIndex = e.target.id.split("-")[1];
      // let allOrders = await getAllOrders();
      // let selectedOrder = allOrders[selectedIndex];
      // //remove the selected order from all orders for changing
      // allOrders.splice(selectedIndex, 1);
      // console.log(allOrders);
      changeQuantity(e, "-", selectedIndex, selectedOrder, allOrders);
      console.log(allOrders);
      // updateUserOrders(allOrders);
    }
    updateUserOrders(allOrders);
  }
}

document.addEventListener("DOMContentLoaded", fillPage);
document.addEventListener("click", clickForQuantity);
