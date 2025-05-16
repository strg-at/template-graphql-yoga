import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import graphqlPlugin from '@graphql-eslint/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/.eslintrc.js',
      '**/tsconfig.json',
      '**/.prettierrc.js',
      'node_modules/*',
      'dist/*',
      'src/schema/resolvers-types.ts',
      'eslint.config.mjs',
    ],
  },
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:jsdoc/recommended'),
  {
    files: ['**/*.ts'],
    processor: graphqlPlugin.processor,
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@stylistic': stylistic,
    },

    languageOptions: {
      globals: {},
      parser: tsParser,
      parserOptions: {
        // project: true,
        tsconfigRootDir: __dirname,
      },
    },

    // settings: {
    //   jsdoc: {
    //     mode: 'typescript',
    //   },
    // },

    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none',
            requireLast: true,
          },

          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        },
      ],

      camelcase: 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          // this allows the _ parameter in resolvers:
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'enumMember',
          format: ['PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // this allows the "Query" and "Mutation" object literals in resolvers and OPENTELEMETRY_ENABLED constant
        {
          selector: 'objectLiteralProperty',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeProperty',
          format: ['camelCase', 'snake_case'],
        },
      ],

      'object-curly-spacing': ['warn', 'always'],
      'no-console': 'error',
      'no-debugger': 'error',
      'arrow-parens': 0,
      'one-var': ['error', 'never'],
      'no-var': ['error'],
      'generator-star-spacing': 0,
      'comma-dangle': ['error', 'only-multiline'],

      indent: [
        'error',
        2,
        {
          ignoredNodes: ['TemplateLiteral'],
          SwitchCase: 1,
        },
      ],

      'template-curly-spacing': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-syntax': 'warn',
      'jsdoc/match-description': 'warn',

      'jsdoc/tag-lines': [
        'warn',
        'always',
        {
          startLines: 1,
          count: 0,
        },
      ],

      'jsdoc/require-description': 'warn',
      'jsdoc/require-description-complete-sentence': 'warn',
      'jsdoc/require-hyphen-before-param-description': 'off',
      'jsdoc/check-types': 'warn',
    },
  },
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      '@graphql-eslint/known-type-names': 'error',
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/naming-convention': [
        'error',
        {
          OperationDefinition: {
            style: 'PascalCase',
            forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
            forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
          },
        },
      ],
    },
  },
]
