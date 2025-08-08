// src/theme/index.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Optional: configure color mode
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Define your custom theme values
const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#e3f9f5",
      100: "#c1ece3",
      200: "#9fdfd1",
      300: "#7dd2bf",
      400: "#5bc5ad",
      500: "#42ab93", // primary
      600: "#338673",
      700: "#245153",
      800: "#142b33",
      900: "#051514",
    },
  },
  fonts: {
    heading: "var(--font-geist-sans), sans-serif",
    body: "var(--font-geist-sans), sans-serif",
    mono: "var(--font-geist-mono), monospace",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.800",
      },
    },
  },
});
export default theme;
