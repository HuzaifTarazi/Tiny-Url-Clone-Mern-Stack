import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Send /api requests to the Express server during development
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
