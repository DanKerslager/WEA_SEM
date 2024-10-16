/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
    {
      ignores: ["node_modules/", "dist/", "build/", "logs/"], // Ignored folders
      languageOptions: {
        globals: {
          window: "readonly",
          document: "readonly",
          console: "readonly",
          React: "readonly", // Added for React
        },
        parserOptions: {
          ecmaVersion: 2021,
          sourceType: "module",
          ecmaFeatures: {
            jsx: true, // Enable JSX parsing
          },
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
        // You might want to define specific settings for React files here if needed
      },
      rules: {
        "react/react-in-jsx-scope": "off", // Not needed with Next.js or similar
      },
      files: ["**/*.jsx", "**/*.tsx"], // Specific to React files
    },
    {
      ignores: ["**/*.html"], // Ignore HTML files unless you want to lint them
    },
  ];
  
  module.exports = config;
  