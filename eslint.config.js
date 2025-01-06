import js from '@eslint/js';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      import: importPlugin, // Register the import plugin
      '@typescript-eslint': tsPlugin, // TypeScript plugin
      'react-hooks': reactHooks, // React hooks
      'react-refresh': reactRefresh, // React Refresh
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json', // Ensure this matches your project setup
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // ESLint plugin import rules
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js and built-in modules
            'external', // npm modules
            'internal', // Absolute imports within the project
            ['parent', 'sibling', 'index'], // Relative imports
          ],
          'newlines-between': 'always', // Enforce newlines between groups
          alphabetize: {
            order: 'asc', // Alphabetical order
            caseInsensitive: true, // Ignore case while sorting
          },
          pathGroups: [
            {
              pattern: 'react', // Ensure React is always first
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'react-*', // Group React-related libraries
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{react-icons/**,react-i18next}', // Separate specific libraries like react-icons and react-i18next
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'], // Prevent React from being sorted with other imports
        },
      ],

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      prettier: prettierPlugin, // Bring in Prettier plugin
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];
