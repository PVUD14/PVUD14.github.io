import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* [V-1] base './' makes the build work on any GitHub Pages path (user site or project site). */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: { host: true, port: 5173 },
})
