import { getDatabyEmail } from "./get-user.js";
export async function updateUserOrders(updatedOrders) {
  try {
    const nonZeroOrders = updatedOrders.filter((order) => order.quantity != 0);
    const userData = await getDatabyEmail("ghoreishi45@gmail.com");
    // Update the userData.orders with non-zero orders
    userData.orders = nonZeroOrders;
    console.log(userData);

    const putResponse = await fetch(
      `http://localhost:3000/users/${userData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (putResponse.ok) {
      console.log("User orders updated successfully");
    } else {
      console.error("Failed to update user orders");
    }
  } catch (error) {
    console.error("Error updating user orders:", error);
  }
}
export async function updateUserAddress(updatedUserArr) {
  try {
    const userData = await getDatabyEmail("ghoreishi45@gmail.com");
    console.log(userData);
    // Update the userData.orders with non-zero orders
    userData.address = updatedUserArr;

    const putResponse = await fetch(
      `http://localhost:3000/users/${userData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (putResponse.ok) {
      console.log("User orders updated successfully");
    } else {
      console.error("Failed to update user orders");
    }
  } catch (error) {
    console.error("Error updating user orders:", error);
  }
}
