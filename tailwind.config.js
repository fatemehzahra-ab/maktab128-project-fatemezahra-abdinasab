// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(badge|button|calendar|card|checkbox|date-input|date-picker|drawer|dropdown|form|image|input|input-otp|listbox|menu|navbar|pagination|scroll-shadow|ripple|spinner|popover|modal|divider).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};