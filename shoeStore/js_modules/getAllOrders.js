import { getDatabyEmail } from "./get-user.js";
export async function getAllOrders() {
  let userData = await getDatabyEmail(`ghoreishi45@gmail.com`);
  let allOrders = userData.orders;
  return allOrders;
}
