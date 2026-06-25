import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
  },
  rules: {
    // Best practices
    'no-var': 'error',
    eqeqeq: 'error',
    'no-eval': 'error',
    'no-implicit-coercion': 'error',

    // TypeScript
    'no-unused-vars': 'error',
    'no-explicit-any': 'warn',
    'consistent-type-imports': 'error',
    'no-floating-promises': 'error',
    'await-thenable': 'error',

    // Restrictions
    'no-console': 'warn',

    // Disabled rules that do not fit this codebase
    'prefer-destructuring': 'off',
    'sort-keys': 'off',
    'switch-case-braces': 'off',
  },
  ignorePatterns: ['.output/**', '.wxt/**', 'node_modules/**'],
});
