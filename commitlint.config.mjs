/**
 * =======================================================================
 * Commitlint Configuration
 * =======================================================================
 * Purpose: Enforce conventional commits and project commit style.
 * Docs: https://commitlint.js.org/#/
 * =======================================================================
 */

/** @type {import('@commitlint/types').UserConfig} */
const config = {
  // ---- Base Ruleset ----
  // Use the conventional commits preset as the starting point
  extends: ['@commitlint/config-conventional'],

  // ---- Strict Standards ----
  // Project-specific stricter rules layered on top of the base preset
  rules: {
    // Enforce a concise header to keep 'git log --oneline' clean
    'header-max-length': [2, 'always', 50],

    // Ensure the body doesn't wrap awkwardly in terminal views
    'body-max-line-length': [2, 'always', 72],

    // Allow mixed case for technical terms like useImageDrawer
    'body-case': [2, 'always', ['sentence-case', 'lower-case']],

    // Disable subject-case rule to allow camelCase identifiers
    'subject-case': [0],
  },
};

export default config;
