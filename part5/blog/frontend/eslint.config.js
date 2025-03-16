import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        console: "readonly",
      },
    },
    plugins: {
      js,
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
]);
