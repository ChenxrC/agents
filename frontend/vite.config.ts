import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/agents': 'http://localhost:4000',
      '/tasks': 'http://localhost:4000'
    }
  }
}); 