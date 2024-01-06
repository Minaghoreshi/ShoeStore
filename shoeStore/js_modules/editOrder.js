import { userEndpoint } from "./util.js";
export async function editOrder(arr) {
  const res = await fetch(userEndpoint);
  const response = await fetch(userEndpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arr),
  });
}
