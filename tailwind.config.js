/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["kalam"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        night: {
          ...require("daisyui/src/theming/themes")["night"],
          ".btn-orange": {
            "background-color": "#ea580c",
            "border-color": "#ea580c",
            color: "#000000",
          },
          ".btn-orange:hover": {
            "background-color": "#ff5400",
            "border-color": "#ea580c",
          },
        },
      },
    ],
  },
};
