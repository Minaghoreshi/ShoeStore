import { getDatabyEmail } from "./get-user.js";
import { updateUserAddress } from "./updateUser.js";
import { showToast } from "./toastify.js";
let addressWrapper = document.querySelector(".adress-wrapper");
let addBtn = document.querySelector(".add");
let selectedAddressName;
async function CreateDefaultAddress() {
  let user = await getDatabyEmail("ghoreishi45@gmail.com");
  let userAddresses = [...user.address];
  console.log(userAddresses);
  userAddresses.forEach((add) => {
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
    <span class="font-bold line-clamp-1">${add.addressTitle}</span>
  
    <span class="price-0 text-base max-w-[155px]">${add.details}</span>
  </div>
  <input
  id="${add.addressTitle}"
  name="${add.name}"
  value=""
  class="radio absolute bottom-5 right-4 rounded-full flex items-center justify-center"
  type="radio"
/>
</div>`;
    addressWrapper.append(addressCart);
  });
}
async function clickHandle(e) {
  if (e.target.classList.contains("radio")) {
    selectedAddressName = e.target.id;
    console.log(selectedAddressName);
  }
  if (e.target.classList.contains("add")) {
    let user = await getDatabyEmail("ghoreishi45@gmail.com");
    let userAddresses = [...user.address];
    console.log(userAddresses);
    userAddresses.forEach((add) => {
      add.default = "off";
    });
    console.log(userAddresses);
    if (selectedAddressName) {
      for (let i = 0; i < userAddresses.length; i++) {
        if (userAddresses[i].addressTitle === selectedAddressName) {
          userAddresses[i].default = "on";
          console.log(
            `Changed default to "on" for address with title ${selectedAddressName}`
          );
          break; // Exit the loop once the address is found and updated
        }
      }
      console.log(userAddresses);
      updateUserAddress(userAddresses);
      // setTimeout(() => {
      //   window.location.href =
      //     "http://127.0.0.1:5500/shoeStore/html/checkout.html";
      // }, 3000);
    } else if (!selectedAddressName) {
      showToast("select Address", "red");
    }
  }
}

document.addEventListener("click", clickHandle);
document.addEventListener("DOMContentLoaded", CreateDefaultAddress);
