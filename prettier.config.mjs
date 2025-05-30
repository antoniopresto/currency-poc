/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'all',
  plugins: ['prettier-plugin-organize-imports'],
  // organizeImportsSkipDestructiveCodeActions: true,
};

export default config;
