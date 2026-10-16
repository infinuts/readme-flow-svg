import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.qa/**',
      '.api-build/**',
      'src/browser.js',
      'src/font-engine.js',
      '.vercel/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  js.configs.recommended,
  // Preserve the existing URL and XML sanitizers byte-for-byte.
  { files: ['src/links.js'], rules: { 'no-useless-escape': 'off' } },
  { files: ['src/svg.js'], rules: { 'no-control-regex': 'off' } },
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: { ecmaVersion: 'latest', globals: { ...globals.browser, ...globals.node } },
    rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }] },
  },
];
