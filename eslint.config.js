/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
    {
      ignores: ["node_modules/", "dist/", "build/", "logs/"], // Ignorované složky
      languageOptions: {
        globals: {
          window: "readonly",
          document: "readonly",
          console: "readonly",
          React: "readonly", // Přidáno pro React
        },
        parserOptions: {
          ecmaVersion: 2021,
          sourceType: "module",
        },
      },
      rules: {
        "no-unused-vars": "warn",
        "no-console": "off",
      },
      files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"], // Include file patterns
    },
    {
      languageOptions: {
        plugins: {
          react: true,
        },
      },
      rules: {
        "react/react-in-jsx-scope": "off", // Not needed with Next.js or similar
      },
      files: ["**/*.jsx", "**/*.tsx"], // Specific to React files
    },
  ];
  
  module.exports = config;
  