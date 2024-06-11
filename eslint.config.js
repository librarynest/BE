import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintImport from "eslint-plugin-import";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: ["./tsconfig.json"],
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
      "simple-import-sort": simpleImportSort,
      import: eslintImport,
    },
    rules: {
      "no-debugger": "error",
      "no-else-return": "error",
      "no-nested-ternary": "off",
      "no-param-reassign": "error",
      "no-var": "error",
      "no-multi-spaces": "error",
      "no-undef-init": "error",
      "no-useless-escape": "error",
      "no-duplicate-imports": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/prefer-namespace-keyword": "off",
      "@typescript-eslint/no-namespace": "off",
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      "no-debugger": "error",
      "no-else-return": "error",
      "no-nested-ternary": "off",
      "no-param-reassign": "error",
      "no-var": "error",
      "no-multi-spaces": "error",
      "no-undef-init": "error",
      "no-useless-escape": "error",
      "no-duplicate-imports": "error",
    },
  },
];
