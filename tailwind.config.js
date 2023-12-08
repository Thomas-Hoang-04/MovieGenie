/** @type {import('tailwindcss').Config} */

const fallbackFont = [
  "-apple-system",
  "BlinkMacSystemFont",
  `"Segoe UI"`,
  "Roboto",
  "Oxygen",
  "Cantarell",
  `"Open Sans"`,
  `"Helvetica Neue"`,
  "sans-serif",
];

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      phone: "320px",
      "phone-l": "425px",
      sm: "576px",
      md: "768px",
      lg: "976px",
      laptop: "1024px",
      xl: "1440px",
      "2xl": "1880px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        prime: ["var(--hauora)", ...fallbackFont],
        logo: ["var(--blockletter)", ...fallbackFont],
      },
      fontSize: {
        "clamp-1": "clamp(1rem, 2.75vw, 2rem)",
        "clamp-2": "clamp(1rem, 4vw, 1.75rem)",
        "clamp-sub": "clamp(0.75rem, 2.5vw, 1.25rem)",
      },
      colors: {
        dark: "hsl(220,26%,14%)",
      },
      dropShadow: {
        logo: "2px 2px #B2F5EA",
        logo_dark: "2px 2px #319795",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
