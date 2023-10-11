import { brandsEndpoint } from "./util.js";
import { getProductsData } from "./get-data.js";
import { createOrderCart } from "./createOrderCart.js";
import { getAllOrders } from "./getAllOrders.js";
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

  let totalPrice = allPrice.reduce((ac, cv) => {
    return ac + cv;
  }, 0);

  fillTotalPrice(totalPrice);
  allOrders.forEach((order, index) => {
    let originalOrderInfo = allModels.filter(
      (model) => model.id == parseInt(order.orderId)
    );

    createOrderCart(order, ...originalOrderInfo, index);
  });
}
async function changeQuantity(e, operator) {
  let selectedIndex = e.target.id.split("-")[1];
  let allOrders = await getAllOrders();
  let selectedOrder = allOrders[selectedIndex];
  //remove the selected order from all orders for changing
  allOrders.splice(selectedIndex, 1);
  //get the old quantity using DOM
  let quantity = parseInt(
    document.querySelector(`.quantity-${selectedIndex}`).innerHTML
  );
  //get the clicked order total price from DOM
  let orderTotalPrice = parseFloat(
    document.querySelector(`.price-${selectedIndex}`).innerHTML
  );
  //calculate the base price using quantty and total
  let basePrice = orderTotalPrice / quantity;
  if (operator == "+") {
    quantity++;
    let newOrderTotalPrice = (orderTotalPrice + basePrice).toFixed(2);
    document.querySelector(
      `.price-${selectedIndex}`
    ).innerHTML = `${newOrderTotalPrice} $`;
    let newCartTotalPrice = (
      parseFloat(cartTotalPrice.innerHTML.split(" ")[1]) + basePrice
    ).toFixed(2);
    cartTotalPrice.innerHTML = `$ ${newCartTotalPrice}`;
  } else if (operator == "-" && quantity > 0) {
    quantity--;
    let newOrderTotalPrice = (orderTotalPrice - basePrice).toFixed(2);
    document.querySelector(
      `.price-${selectedIndex}`
    ).innerHTML = `${newOrderTotalPrice} $`;
    let newCartTotalPrice = (
      parseFloat(cartTotalPrice.innerHTML.split(" ")[1]) - basePrice
    ).toFixed(2);
    cartTotalPrice.innerHTML = `$ ${newCartTotalPrice}`;
  }

  let quantitytext = document.querySelector(`.quantity-${selectedIndex}`);

  quantitytext.textContent = quantity;
}
async function clickForQuantity(e) {
  if (e.target.innerHTML === "+") {
    changeQuantity(e, "+");
  } else if (e.target.innerHTML === "-") {
    changeQuantity(e, "-");
  }
}

document.addEventListener("DOMContentLoaded", fillPage);
document.addEventListener("click", clickForQuantity);
