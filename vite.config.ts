import { defineConfig } from "vite";
import dotenv from "dotenv";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

dotenv.config();
console.log(process.env);
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
