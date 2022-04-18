module.exports = {
  plugins: ["prettier"],
  extends: [
    "next/core-web-vitals",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:jest-formatting/strict",
    "prettier",
    "plugin:storybook/recommended",
  ],
  rules: {
    // Enable auto-fixing for prettier rules
    "prettier/prettier": "error",
  },
};
