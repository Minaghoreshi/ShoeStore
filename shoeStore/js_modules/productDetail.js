import { getProductsData } from "./get-data.js";
import { showToast } from "./toastify.js";
import { brandsEndpoint, userEndpoint } from "./util.js";
import { getDatabyEmail } from "./get-user.js";
// import { updateUserOrders } from "./updateUserOrder.js";
import { updateUserOrders } from "./updateUser.js";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let stats = "active";
let selectedSize;
let selectedColor;
let currntImageIndex = 0;
let totalOrderPrice;
let counter = 0;
let shoeName = document.querySelector(".shoe-title");
let sold = document.querySelector(".sold-value");
let rate = document.querySelector(".rate-review");
let description = document.querySelector(".product-description");
let sizeSection = document.querySelector(".size-section");
let colorSection = document.querySelector(".color-section");
let carouselImageContainer = document.querySelector(".img-container");
let carouselBtn = document.querySelector(".carousel-button");

let totalPrice = document.querySelector(".price");
let quantity = document.querySelector(".quantity");
class MyObject {
  constructor(orderId, color, quantity, size, totalOrderPrice, stats) {
    this.orderId = orderId;
    this.color = color;
    this.quantity = quantity;
    this.size = size;
    this.totalPrice = totalOrderPrice;
    this.stats = stats;
  }
}

async function getu() {
  let user = await getDatabyEmail(`ghoreishi45@gmail.com`);
  return user.orders;
}

//back to home page
document.querySelector(".back-botton").addEventListener("click", () => {
  window.location.href = `http://127.0.0.1:5500/html/home.html`;
});
//get the data of product from id in urlparams
async function getproductById(id) {
  let result;
  try {
    const data = await getProductsData(brandsEndpoint);
    data.forEach((brand) => {
      brand.models.forEach((model) => {
        if (model.id == id) {
          result = model;
        }
      });
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

//get price
async function getRawPrice() {
  let product = await getproductById(id);
  return product.price;
}
async function getTotalQuantity() {
  let product = await getproductById(id);
  return product.quantity;
}
//fill name,description,rates,...
async function fillProductDetails() {
  try {
    let product = await getproductById(id);
    shoeName.textContent = product.name;
    sold.innerHTML = `${product.sold} sold`;
    rate.innerHTML = `${product.rate} (${product.reviews} Reviews)`;
    description.innerHTML = product.description;
  } catch (error) {
    console.log(error);
  }
}
//function for change the color of the selected color snd size and save the selected in variables
async function clickHandle(e) {
  if (e.target.classList.contains("size-circle")) {
    selectedSize = e.target.textContent;
    changeSelectedSizeStyle();
    e.target.classList.add("bg-black", "text-white");
  } else if (e.target.classList.contains("color-circle")) {
    selectedColor = e.target.id;
    changeSelectedColorStyle();
    e.target.innerHTML = " &check;";
  } else if (e.target.classList.contains("carouselBtn")) {
    let currntImageIndex = e.target.id.split("-")[1];
    carouselImageContainer.innerHTML = "";
    createCareousleImages(currntImageIndex);
    createCarouseButtons(currntImageIndex);
  } else if (e.target.classList.contains("decrease")) {
    let price = await getRawPrice();
    if (counter > 0) {
      counter--;
      quantity.innerHTML = counter;
      totalOrderPrice = (counter * price).toFixed(2);
      totalPrice.innerHTML = `$ ${totalOrderPrice}`;
    } else if (counter == 0) {
      quantity.innerHTML = counter;
      totalOrderPrice = (counter * price).toFixed(2);
      totalPrice.innerHTML = `$ ${totalOrderPrice}`;
    }
  } else if (e.target.classList.contains("increase")) {
    let price = await getRawPrice();
    let totalQuantity = await getTotalQuantity();

    if (totalQuantity > counter) {
      counter++;
      quantity.innerHTML = counter;
      totalOrderPrice = (counter * price).toFixed(2);
      totalPrice.innerHTML = `$ ${totalOrderPrice}`;
    }
  } else if (e.target.classList.contains("add-to-cart")) {
    if (id && selectedColor && counter != 0 && selectedSize) {
      showToast("added successfully", "green");
      console.log("cart clicked");
      const newOrder = new MyObject(
        id,
        selectedColor,
        counter,
        selectedSize,
        totalOrderPrice,
        stats
      );
      let userOrders = await getu();
      userOrders.push(newOrder);
      console.log(userOrders);
      setTimeout(() => {
        updateUserOrders(userOrders);
      }, 3000);
    } else {
      showToast("complete your order", "red");
    }
  }
}
//resetting style of size and color circles
function changeSelectedSizeStyle() {
  let sizeNode = document.querySelectorAll(".size-circle");
  sizeNode.forEach((node) => {
    node.classList.remove("bg-black", "text-white");
  });
}
function changeSelectedColorStyle() {
  let colorNode = document.querySelectorAll(".color-circle");
  colorNode.forEach((node) => (node.innerHTML = ""));
}

//create size circle for each size in produt data
async function createSizeSection() {
  let product = await getproductById(id);
  let size = [...product.sizes];
  size.sort((a, b) => parseInt(a) - parseInt(b));
  size.forEach((size) => {
    let sizeDiv = document.createElement("div");
    sizeDiv.classList.add("size-circle");
    sizeDiv.innerHTML = size;
    sizeSection.append(sizeDiv);
  });
}
//create color circle for each color in produt data
async function createColorSection() {
  let product = await getproductById(id);
  let colors = [...product.colors];
  colors = colors.map((color) => color.toLowerCase());
  colors.forEach((color) => {
    let colorDiv = document.createElement("div");
    colorDiv.setAttribute("id", color);
    if (color == "black") {
      colorDiv.classList.add("color-circle", `bg-${color}`, "text-white");
    } else if (color == "white") {
      colorDiv.classList.add(
        "text-black",
        "color-circle",
        `bg-${color}`,
        "border-2",
        "border-gray-600"
      );
    } else {
      colorDiv.classList.add("color-circle", `bg-${color}-600`, "text-white");
    }
    colorSection.append(colorDiv);
  });
}
//function for creating the buttons of carousel
async function createCarouseButtons(value) {
  carouselBtn.innerHTML = "";
  let product = await getproductById(id);
  let productImages = [...product.img];
  productImages.forEach((img, index) => {
    let btn = document.createElement("span");
    btn.classList.add("carouselBtn");
    btn.setAttribute("id", `img-${index}`);
    if (index == value) {
      btn.classList.add("w-11", "bg-black");
    }
    carouselBtn.append(btn);
  });
}
//function for filling the image according to index
async function createCareousleImages(index) {
  let product = await getproductById(id);
  let productImages = [...product.img];
  let image = document.createElement("img");
  image.classList.add("carousel-img");
  image.setAttribute("src", productImages[index]);
  carouselImageContainer.append(image);
}

document.addEventListener("DOMContentLoaded", () => {
  currntImageIndex = 0;

  fillProductDetails();
  createColorSection();
  createSizeSection();
  createCarouseButtons(currntImageIndex);
  createCareousleImages(currntImageIndex);
});

document.addEventListener("click", clickHandle);
