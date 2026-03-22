import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/LuteDrops/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'LuteDrops',
        short_name: 'LuteDrops',
        description: 'Free stuff drops at Pacific Lutheran University',
        theme_color: '#F0B429',
        background_color: '#0d0d0d',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/LuteDrops/',
        icons: [
          {
            src: '/LuteDrops/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/LuteDrops/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
