/**
 * ======================================================================
 * Vite Build Configuration
 * ======================================================================
 * Purpose: Configures library bundling, TypeScript declaration
 *          generation, and output formats for the schema package.
 * Docs: https://vite.dev/config/
 * ======================================================================
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  plugins: [dts({ include: ['src/**/*.ts', 'src/**/*.tsx'], exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'] })],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: { index: path.resolve(__dirname, 'src/index.ts'), react: path.resolve(__dirname, 'src/react.tsx') },
      formats: ['es'],
      fileName: (_format, entryName) => entryName + '.js',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        preserveModules: false,
        globals: { react: 'React', 'react/jsx-runtime': 'jsx-runtime' },
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        manualChunks(id) {
          if (id.includes('/utils/')) {
            return 'utils';
          }
          return;
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
});
