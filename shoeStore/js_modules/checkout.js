// import { fillTotalPrice } from "./cart.js";
import { brandsEndpoint, userEndpoint, shippingEdPoint } from "./util.js";
import { getProductsData } from "./get-data.js";
import { getAllOrders } from "./getAllOrders.js";
import { createOrderCart } from "./createOrderCart.js";
import { getDatabyEmail } from "./get-user.js";
let totalPrice;
let amount = document.querySelector(".amount");
let shiping = document.querySelector(".shiping");
let total = document.querySelector(".total");

let orderWrapper = document.querySelector(".order-wrapper");
export let addressWrapper = document.querySelector(".adress-wrapper");
function createOrderList(order, originalOrderInfo) {
  let orderCart = document.createElement("div");
  orderCart.classList.add("order-cart");
  orderCart.innerHTML = `   <div class="order-image">
  <img src="${originalOrderInfo.img[0]}" alt="" />
</div>
<div class="flex flex-col gap-3">
  <span class="max-w-[155px] font-semibold line-clamp-1"
    >${originalOrderInfo.name}</span
  >
  <div class="flex gap-1 items-center">
    <div
      class="rounded-full w-5 h-5 border border-gray-500 bg-${order.color}-400"
    ></div>
    <span class="text-xs">${order.color}</span>
    <div class="bg-gray-400 w-[2px] h-4"></div>
    <span class="text-xs">Size = ${order.size}</span>
  </div>
  <span class="price-0 mt-4 text-base font-semibold">${order.totalPrice} $</span>
</div>

<span
  class="bg-gray-100 w-11 h-11 absolute bottom-5 right-4 rounded-full flex items-center justify-center gap-5"
>
${order.quantity}
</span>
  `;
  orderWrapper.append(orderCart);
}

async function fillOrderSection() {
  const brands = await getProductsData(brandsEndpoint);

  let allModels = [];
  brands.forEach((brand) => {
    allModels.push(...brand.models);
  });
  let allOrders = await getAllOrders();
  const activeOrders = allOrders.filter((order) => order.stats === "active");
  let allPrice = activeOrders.map((order) => parseFloat(order.totalPrice));
  totalPrice = allPrice
    .reduce((ac, cv) => {
      return ac + cv;
    }, 0)
    .toFixed(2);

  amount.textContent = totalPrice;
  activeOrders.forEach((order, index) => {
    let originalOrderInfo = allModels.filter(
      (model) => model.id == parseInt(order.orderId)
    );

    createOrderList(order, ...originalOrderInfo);
  });
}
//get shippig methods, check if one is selected and add it to the dom
async function shippingCheck() {
  let shippingData = await getProductsData(shippingEdPoint);
  //check if anyone is selected
  const hasSelectedMethod = shippingData.some(
    (method) => method.selected === "yes"
  );
  //if found a yes, add its price
  if (hasSelectedMethod) {
    const selectedMethod = shippingData.find(
      (method) => method.selected === "yes"
    );
    shiping.textContent = selectedMethod.price;
    const brands = await getProductsData(brandsEndpoint);

    let allModels = [];
    brands.forEach((brand) => {
      allModels.push(...brand.models);
    });
    let allOrders = await getAllOrders();
    const activeOrders = allOrders.filter((order) => order.stats === "active");
    let allPrice = activeOrders.map((order) => parseFloat(order.totalPrice));
    totalPrice = allPrice
      .reduce((ac, cv) => {
        return ac + cv;
      }, 0)
      .toFixed(2);

    total.textContent =
      parseFloat(totalPrice) + parseFloat(selectedMethod.price);
  }
}
async function CreateDefaultAddress() {
  let user = await getDatabyEmail("ghoreishi45@gmail.com");
  let userAddresses = [...user.address];
  let defaultAdress = userAddresses.find((address) => {
    return address.default === "on";
  });
  let addressCart = document.createElement("div");
  addressCart.classList.add("address-cart");
  addressCart.innerHTML = `  <div
  class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full"
>
  <iconify-icon
    icon="fluent:location-12-filled"
    width="30"
    height="30"
  ></iconify-icon>
</div>
<div class="flex flex-col">
  <span class="font-bold line-clamp-1">${defaultAdress.addressTitle}</span>

  <span class="price-0 text-base max-w-[190px]">${defaultAdress.details}</span>
</div>
<iconify-icon
  class="address-list absolute bottom-5 right-4 rounded-full flex items-center justify-center"
  icon="ri:edit-2-fill"
  width="30"
  height="30"
></iconify-icon>`;
  addressWrapper.append(addressCart);
}

document.addEventListener("DOMContentLoaded", () => {
  fillOrderSection();
  CreateDefaultAddress();
  shippingCheck();
});
function clickHandle(e) {
  console.log(e.target);
  if (e.target.classList.contains("back-botton")) {
    window.location.href = `http://127.0.0.1:5500/shoeStore/html/home.html`;
  } else if (e.target.classList.contains("address-list")) {
    window.location.href = `http://127.0.0.1:5500/shoeStore/html/address.html`;
  } else if (e.target.parentNode.classList.contains("shipping")) {
    window.location.href = `http://127.0.0.1:5500/shoeStore/html/shippingType.html`;
  }
}

document.addEventListener("click", clickHandle);
