/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        picture1: "url('../backgrounds/WallpaperDog-20534610%201.png')",
      },
      animation: {
        fadeAndHide: "fadeAndHide 2s ease-in-out",
        slideRight: "slideRight 1s ease-in-out",
      },
      keyframes: (theme) => ({
        fadeAndHide: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            display: "none", // Add display: none to hide the element
          },
        },
        slideRight: {
          "0%": { transform: "translateX(100%)" }, // Start off-screen to the right
          "100%": { transform: "translateX(0)" }, // Slide in to the original position
        },
      }),
      // lineClamp: {
      //   7: "7",
      //   8: "8",
      //   9: "9",
      //   10: "10",
      // },
    },
  },
  // variants: {
  //   lineClamp: ["responsive", "hover"],
  // },
  // plugins: [require("@tailwindcss/line-clamp")],
};
