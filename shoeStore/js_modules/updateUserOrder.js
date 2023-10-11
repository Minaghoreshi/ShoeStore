export async function updateUserOrders(updatedOrders) {
  try {
    let userData = await getDatabyEmail(`ghoreishi45@gmail.com`);
    userData.orders = updatedOrders;
    console.log(userData.id);
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
