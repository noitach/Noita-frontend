import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.otf'],
  server: {
    proxy: {
      '/api': {
        target: 'https://noita-backend-982182162415.europe-west1.run.app',
        changeOrigin: true,
      },
      '/images': {
        target: 'https://noita-backend-982182162415.europe-west1.run.app',
        changeOrigin: true,
      },
    },
  },
});
