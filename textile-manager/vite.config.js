import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://stockmanagementsystem-d5kp.onrender.com', // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
