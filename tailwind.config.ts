import { headers } from "next/headers";
import type { Config } from "tailwindcss";
const { addDynamicIconSelectors } = require("@iconify/tailwind");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      header: "#FE8ACB",
      header_act: "#AE1B7C",

      color1: "#BF2489",
      color2: "#40022A",
      color3: "#260116",
      color4: "#BD2CBF",

      color1_1: "#C93192",
      color2_1: "#9F5D81",
      color3_1: "#906679",
      color4_1: "#A416A7",

      color1_2: "#F26BBA",
      color2_2: "#C888A9",
      color3_2: "#B890A2",
      color4_2: "#E769E6",

      color1_3: "#8F0D65",
      color2_3: "#6F3A57",
      color3_3: "#624251",
      color4_3: "#89078B",

      pearl: "#fcfcf7",
      pearl_dark: "#f4f3f3",
      black: "#131313",
      white: "#FFFFFF",

      online: "#24DD2B",
      ofline: "#DC0000",
      IDK: "#626262",

      not_disturb: "#FFE600",
      transparent: "transparent",
      cold_season: "#f8f7f4",
      ivory: "#fffff0",
      marble: "#f2f8fc",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [addDynamicIconSelectors],
};
export default config;
