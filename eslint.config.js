const eslintPluginNode = require('eslint-plugin-node');
const globals = require('globals');

module.exports = [
  // Default: Node-style JS everywhere
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...globals.node },
    },
    plugins: { node: eslintPluginNode },
    rules: {
      'no-console': 'off',
      'no-undef': 'error',
    },
  },

  // Browser globals just for /public
  {
    files: ['public/**/*.js'],
    languageOptions: {
      // if these are ES modules, keep 'module'
      sourceType: 'module',
      globals: { ...globals.browser },
    },
  },
];
