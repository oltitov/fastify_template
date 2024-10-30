import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default ts.config(js.configs.recommended, ...ts.configs.recommended, {
  languageOptions: {
    globals: {
      ...globals.node
    },
    parserOptions: {
      parser: '@typescript-eslint/parser'
    }
  },
  ...prettierRecommended
});
