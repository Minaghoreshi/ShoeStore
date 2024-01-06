export function showToast(text, background) {
  Toastify({
    text: text,
    duration: 3000,

    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: background,
    },
    onClick: function () {
      // Callback after click
    },
  }).showToast();
}

// Usage:
// showToast(
//   "This is a toast",
//   "linear-gradient(to right, #00b09b, #96c93d)",
//   "https://github.com/apvarun/toastify-js"
// );
