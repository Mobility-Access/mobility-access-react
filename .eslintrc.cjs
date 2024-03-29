module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', "react", "react-hooks"],
    root: true,
    rules: {
        "@typescript-eslint/no-explicit-any": "off"
      }
  };