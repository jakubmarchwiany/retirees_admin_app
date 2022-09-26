import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/admin/",
    server: {
        port: 3000,
    },
    build: {
        outDir: "./build",
    },
    plugins: [react(), tsconfigPaths()],
});
