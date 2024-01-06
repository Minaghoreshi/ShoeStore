import { getAllOrders } from "./getAllOrders.js";
import { getProductsData } from "./get-data.js";
import { updateUserOrders } from "./updateUser.js";
import { brandsEndpoint, userEndpoint, shippingEdPoint } from "./util.js";
document.querySelector(".confirm").addEventListener("click", openModal);
async function openModal() {
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
  const brands = await getProductsData(brandsEndpoint);

  let allModels = [];
  brands.forEach((brand) => {
    allModels.push(...brand.models);
  });
  let allOrders = await getAllOrders();

  allOrders.forEach((order) => {
    order.stats = "completed";
  });
  // console.log(activeOrders);
  updateUserOrders(allOrders);
}
document.addEventListener("click", clickHandle);
function clickHandle(e) {
  if (e.target.classList.contains("view")) {
    console.log("view");
    window.location.href = "http://127.0.0.1:5500/html/orders.html";
  }
}
