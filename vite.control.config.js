import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  cacheDir: 'node_modules/.vite-control',
  server: {
    port: 5174,
    strictPort: true
  }
});
