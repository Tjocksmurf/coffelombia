import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // When deploying to GitHub Pages, set the base to the repo name (replace if different)
  base: '/coffelombia/',
})
