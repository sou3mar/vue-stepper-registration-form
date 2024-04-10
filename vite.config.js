import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import autoprefixer from "autoprefixer"
import tailwind from "tailwindcss"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    css: {
        postcss: {
            plugins: [
                tailwind(), // Assuming you have Tailwind configured
                autoprefixer(), // Use the imported autoprefixer directly
            ],
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
})
