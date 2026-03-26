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
  // ---- Plugins ----
  plugins: [
    // Generate .d.ts declaration files from source, excluding tests
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      rollupTypes: false,
    }),
  ],

  // ---- Module Resolution ----
  // Map @/* imports to the src directory
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },

  // ---- Build Options ----
  build: {
    // Clean the output directory before building
    emptyOutDir: true,
    // Output to the dist directory
    outDir: 'dist',
    lib: {
      // Define dual entry points for core and React exports
      entry: { index: path.resolve(__dirname, 'src/index.ts'), react: path.resolve(__dirname, 'src/react.tsx') },
      // Output ESM and CJS formats with .cjs extension for CommonJS
      formats: ['es', 'cjs'],
      // Use .cjs extension for CommonJS format
      fileName: (format, entryName) => `${entryName}.${format === 'cjs' ? 'cjs' : 'js'}`,
    },
    rollupOptions: {
      // Exclude React from the bundle; consumers provide their own
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Map externals to global variable names for UMD fallback
        globals: { react: 'React', 'react-dom': 'ReactDOM', 'react/jsx-runtime': 'jsx-runtime' },
        // Bundle all modules into a single chunk per entry
        preserveModules: false,
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: '[name].js',
      },
    },
    // Emit source maps for debugging
    sourcemap: true,
    // Keep output readable for development
    minify: false,
  },
});
