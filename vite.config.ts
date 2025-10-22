import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // When deploying to GitHub Pages, set the base to the repo name (replace if different)
  base: '/coffelombia/',
  css: {
    // Enable CSS sourcemaps in dev for easier debugging
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // You can inject global variables/mixins into every scss file like this:
        // additionalData: `@import "src/styles/_variables.scss";`
      },
    },
  },
})
