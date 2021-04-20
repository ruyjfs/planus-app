module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: "@typescript-eslint/parser",
  plugins: ['eslint-plugin-import-helpers', '@typescript-eslint'],
  rules: {
    "@typescript-eslint/rule-name": "error",
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always', // new line between groups
        groups: [
          '/^react/',
          '/^~/',
          'module',
          // '/^@shared/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  "settings": {
    "import/resolver": {
      "babel-plugin-root-import": {}
    }
  }
};
