import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  outDir: 'build',
  manifest: {
    name: 'Habit tracker',
    short_name: 'H tracker',
    description: 'Habit tracker app powered by ReactJS',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
})

export default defineConfig({
  plugins: [react(), VitePWA()],
})
