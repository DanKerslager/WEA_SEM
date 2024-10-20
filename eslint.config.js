/** @type {import("eslint").Linter.FlatConfig[]} */

// Import the necessary ESLint plugins
const importPlugin = require("eslint-plugin-import");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const reactPlugin = require("eslint-plugin-react");

const config = [
  {
    // Using necessary plugins
    plugins: {
      import: importPlugin,
      "jsx-a11y": jsxA11yPlugin,
      react: reactPlugin,
    },

    // Ignoring specific folders to avoid unnecessary linting
    ignores: ["node_modules/", "dist/", "build/", "logs/"],

    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        React: "readonly", // Added for React
      },
      parserOptions: {
        ecmaVersion: 2021, // Support ECMAScript 2021
        sourceType: "module", // Use ES modules
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing for React
        },
      },
    },

    rules: {
      // --- Code Style Rules ---
      "indent": ["error", 2], // Enforce 2-space indentation
      "semi": ["error", "always"], // Require semicolons
      "no-trailing-spaces": "error", // Disallow trailing spaces
      "eol-last": ["error", "always"], // Enforce newline at the end of files
      "no-multiple-empty-lines": ["error", { max: 1 }], // Disallow multiple empty lines

      // --- Best Practices ---
      //"no-unused-vars": "warn", // Warn on unused variables
      "no-console": "off", // Allow console (useful for debugging)
      "no-eval": "error", // Disallow the use of eval() for security reasons
      "no-implicit-globals": "error", // Disallow implicit global variables
      "eqeqeq": ["error", "always"], // Enforce the use of === and !==

      // --- Import/Export Rules (requires eslint-plugin-import) ---
      "import/order": ["error", { "groups": [["builtin", "external", "internal"]] }], // Enforce import order (builtin, external, then internal)
      "no-duplicate-imports": "error", // Disallow duplicate import statements
      "import/newline-after-import": "error", // Require newline after import statements
      "import/no-mutable-exports": "error", // Disallow exporting mutable bindings

      // --- React and JSX Specific Rules (requires eslint-plugin-react) ---
      "react/react-in-jsx-scope": "off", // React no longer needs to be in scope with JSX
      "react/self-closing-comp": "error", // Enforce self-closing on components with no children

      // --- Accessibility Rules (requires eslint-plugin-jsx-a11y) ---
      "jsx-a11y/alt-text": "error", // Enforce alt attribute for all <img> elements
      "jsx-a11y/anchor-is-valid": "error", // Ensure anchors are used correctly
      "jsx-a11y/label-has-associated-control": "error", // Enforce all labels have associated controls
      "jsx-a11y/no-static-element-interactions": "warn", // Warn when non-interactive elements have event handlers
    },

    // Files to be included for linting
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  },

  {
    // Specific configuration for React/JSX files
    languageOptions: {},
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed in modern React setups
    },
    files: ["**/*.jsx", "**/*.tsx"], // Only for React files
  },

  {
    // Ignoring HTML files
    ignores: ["**/*.html"],
  },
];

// Export the configuration
module.exports = config;
