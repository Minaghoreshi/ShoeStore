import { getDatabyEmail } from "./get-user.js";
import { shippingEdPoint } from "./util.js";
import { getProductsData } from "./get-data.js";
import { updateUserAddress } from "./updateUser.js";
import { showToast } from "./toastify.js";
let selectedShippingMethod;
let addressWrapper = document.querySelector(".adress-wrapper");
let addBtn = document.querySelector(".add");

async function createShippingCards() {
  let data = await getProductsData(shippingEdPoint);
  console.log(data);

  data.forEach((type) => {
    let addressCart = document.createElement("div");
    addressCart.classList.add("address-cart");
    addressCart.innerHTML = `   <div
    class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full"
  >
    <iconify-icon
      icon="fluent:location-12-filled"
      width="30"
      height="30"
    ></iconify-icon>
  </div>
  <div class="flex flex-col">
    <span class="font-bold line-clamp-1">${type.name}</span>

    <span class="price-0 text-base max-w-[155px]">${type.details} </span>
  </div>
  <div
    class="flex absolute bottom-5 right-4 rounded-full gap-5 items-center justify-center"
  >
    <span>${type.price}$</span>
    <input class="radio" id="${type.name}"
    name="${type.naame}" type="radio" />
  </div>`;
    addressWrapper.append(addressCart);
  });
}
async function clickHandle(e) {
  if (e.target.classList.contains("radio")) {
    selectedShippingMethod = e.target.id;
    console.log(selectedShippingMethod);
  } else if (e.target.classList.contains("add")) {
    let data = await getProductsData(`http://localhost:3000/shipping`);

    console.log(data);
    data.forEach((add) => {
      add.selected = "no";
    });
    console.log(data);
    let selectedobj;
    if (selectedShippingMethod) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === selectedShippingMethod) {
          data[i].selected = "yes";
          selectedobj = data[i]; // Exit the loop once the address is found and updated
        }
      }
      console.log(data);
      console.log(selectedobj);
      const putResponse = await fetch(
        `http://localhost:3000/shipping/${selectedobj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedobj),
        }
      );
      setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/html/checkout.html";
      }, 1000);
    } else if (!selectedShippingMethod) {
      showToast("select Address", "red");
    }
  }
  if (e.target.classList.contains("back-botton")) {
    window.location.href = `http://127.0.0.1:5500/html/checkout.html`;
  }
}
document.addEventListener("click", clickHandle);
document.addEventListener("DOMContentLoaded", createShippingCards);
