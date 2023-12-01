import localFont from "next/font/local";

export const Blockletter = localFont({
  src: "./Blockletter.otf",
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Roboto",
    "Oxygen",
    "Cantarell",
    "sans-serif",
  ],
  variable: "--blockletter",
});

export const Hauora = localFont({
  src: "./HauoraGX.ttf",
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Roboto",
    "Oxygen",
    "Cantarell",
    "sans-serif",
  ],
  variable: "--hauora",
});
