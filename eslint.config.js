module.exports = {
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 0,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
  plugins: ['node'],
};
