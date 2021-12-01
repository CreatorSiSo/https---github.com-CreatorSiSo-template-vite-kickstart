// https://vitejs.dev/config/

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@icons': '/components/app/_sprite-items/icons/',
    },
  },
});
