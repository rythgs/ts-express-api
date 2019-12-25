module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  globals: {
    __DEV__: true
  },
  plugins: ["@typescript-eslint", "import", "simple-import-sort"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    // typescript
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-explicit-any": 0,
    // prettier
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all",
        semi: false
      }
    ],
    // common
    "prefer-const": 2,
    "no-unused-vars": 2,
    "no-multiple-empty-lines": [2, { max: 1 }],
    // import
    "import/newline-after-import": 2,
    "import/imports-first": 2,
    "import/no-dynamic-require": 2,
    "import/no-extraneous-dependencies": 2,
    "import/no-mutable-exports": 2,
    "import/no-commonjs": 2,
    // import sort
    "simple-import-sort/sort": 2
  }
};
