import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'out',
  },
  plugins: [
    react(),
    svgr(),
    ViteImageOptimizer({
      webp: {
        quality: 80,
        lossless: false,
      },
      png: {
        quality: 80,
      },
      svg: {
        multipass: true,
        plugins: [
          { name: 'preset-default' },
        ] as unknown as import('svgo').PluginConfig[],
      },
    }),
  ],
  server: {
    host: true,
  },
  optimizeDeps: {
    exclude: ['components-funtech-ui'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
});
