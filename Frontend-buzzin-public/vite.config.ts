import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    __BACKEND_URL__: JSON.stringify('https://are-you-buzzin-backend-spring-production.up.railway.app')
  }
})