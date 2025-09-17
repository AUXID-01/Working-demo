import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
/*export default defineConfig({
  plugins: [react()],
})*/

export default {
  // other config...
  server: {
    host: true, // or '0.0.0.0'
    allowedHosts: ['frontend', 'localhost', 'your-other-hosts'],
  }
}

