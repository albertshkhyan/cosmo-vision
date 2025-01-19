import js from '@eslint/js';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser'; // Import the TypeScript parser
import prettierPlugin from 'eslint-plugin-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    ignores: ['dist', 'node_modules'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser, // Use the imported TypeScript parser here
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json', // Ensure TypeScript project is resolved
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,

      // Import order and grouping
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Built-in Node.js modules (e.g., fs, path)
            'external', // External modules (e.g., react, lodash)
            'internal', // Internal modules (aliases, e.g., @app/**)
            ['parent', 'sibling', 'index'], // Parent, sibling, and index files
          ],
          pathGroups: [
            {
              pattern: 'react', // React first
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@app/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@features/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@shared/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@utils/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'react/no-unknown-property': 'off',
      'react/prop-types': 'off', // Disable prop-types enforcement

      // Example React-specific rule
      'react/jsx-boolean-value': ['error', 'never'],
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];
