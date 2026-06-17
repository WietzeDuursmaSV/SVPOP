import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  cacheDir: 'node_modules/.vite-presentation',
  server: {
    port: 5173,
    strictPort: true
  }
});
