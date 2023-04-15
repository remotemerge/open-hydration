// vite cores
import { defineConfig } from 'vite';

// init plugins
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

// overwrite configs
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        worker: '/src/background/index.ts',
        option: 'option.html',
        popup: 'popup.html',
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (/\.css$/.test(assetInfo.name ?? '')) {
            return 'css/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
    },
  },
});
