export async function getDatabyEmail(email) {
  try {
    let res = await fetch(`http://localhost:3000/users`);
    let data = await res.json();
    let userbyEmail = data.find((user) => user.email === email.toLowerCase());
    return userbyEmail;
    // let remember = userbyEmail.remember;
    // return remember;
  } catch (error) {
    console.log(error);
  }
}
