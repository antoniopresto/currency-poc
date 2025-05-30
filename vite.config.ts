import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import wyw from '@wyw-in-js/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wyw({
      displayName: true,
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript'],
      },
    }),
  ],
});
