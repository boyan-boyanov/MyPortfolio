import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
  define: {
    // Build time, appended to the CV PDF URL (?v=...) so every deploy bypasses the browser's cached copy
    __CV_VERSION__: JSON.stringify(String(Date.now())),
  },
})
