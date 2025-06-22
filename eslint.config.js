const eslintPluginNode = require('eslint-plugin-node');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
    },
    plugins: {
      node: eslintPluginNode,
    },
    rules: {
      'no-console': 'off',
    },
  },
];
