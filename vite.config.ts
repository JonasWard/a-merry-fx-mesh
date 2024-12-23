import dns from 'node:dns';
import { defineConfig } from 'vite';
dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3013,
  },
  build: {
    rollupOptions: {
      treeshake: true,
    },
    outDir: './build',
  },
  base: '/a-merry-fx-mesh/',
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
