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

// ---- Module Resolution ----
export default defineConfig(({ mode }) => ({
  // ---- Plugins ----
  plugins: [
    // Generate .d.ts declaration files from source, excluding tests
    dts({ include: ['src/**/*.ts', 'src/**/*.tsx'], exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'] }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    outDir: 'dist',
    // Clean the output directory only on first build
    emptyOutDir: mode !== 'react',
    lib: {
      // Build one entry at a time based on mode
      entry: path.resolve(__dirname, mode === 'react' ? 'src/react.tsx' : 'src/index.ts'),
      // Output ESM and CJS formats with .cjs extension for CommonJS
      formats: ['es', 'cjs'] as const,
      // Write flat files such as index.js, index.cjs, react.js, react.cjs
      fileName: (format, entryName) => `${entryName}.${format === 'cjs' ? 'cjs' : 'js'}`,
    },
    rollupOptions: {
      // Exclude React from the bundle; consumers provide their own
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Map externals to global variable names for UMD fallback
        globals: { react: 'React', 'react-dom': 'ReactDOM', 'react/jsx-runtime': 'jsx-runtime' },
      },
    },
    // Emit inline source maps for debugging
    sourcemap: true,
    // Keep output readable for development
    minify: false,
  },
}));
