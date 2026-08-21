import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig([
  globalIgnores(['dist/**', 'node_modules/**']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'import/order': [
        'error',
        {
          'groups': [
            'builtin', // fs, path
            'external', // payload, next
            'internal',
            'parent', // ../
            'sibling', // ./
            'index', // index file
            'object',
            'type',
          ],
          'newlines-between': 'always',
        },
      ],
      'quote-props': ['error', 'consistent-as-needed'],
      'no-console': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
    },
  },
  // Language enum members mirror locale identifiers (e.g. `English = 'en'`).
  {
    files: ['src/i18n/languages.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  prettierConfig,
])

export default eslintConfig
