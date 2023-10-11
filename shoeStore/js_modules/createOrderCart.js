const container = document.querySelector(".container");
export function createOrderCart(order, originOfOrder, orderIndex) {
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
  <span class="price-${orderIndex} mt-4 text-xl font-semibold">${order.totalPrice} $</span>
</div>
<div class="absolute top-5 right-4">
  <iconify-icon
    icon="iconoir:trash"
    width="30"
    height="30"
  ></iconify-icon>
</div>
<div
  class="bg-gray-100 absolute bottom-5 right-4 rounded-full px-5 py-2 flex items-center justify-center gap-5"
>
  <button class="increase text-2xl" id="index-${orderIndex}">+</button>
  <span class="quantity quantity-${orderIndex}">${order.quantity}</span>
  <button class="decrease text-2xl"  id="index-${orderIndex}">-</button>
</div>`;
  orderCart.insertAdjacentHTML("beforeend", html);
  container.append(orderCart);
}
