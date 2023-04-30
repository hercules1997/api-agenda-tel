module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["standard", "prettier"],
  overrides: [],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    camelcase: 'off',
  },
};