import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  define: {
    'process.env.REACT_APP_URL': '"https://hilportal-dusky.vercel.app/"'
  },
})
