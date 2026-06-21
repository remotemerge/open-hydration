import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  printWidth: 120,
  ignorePatterns: ['.output/**', '.wxt/**', 'node_modules/**'],
  overrides: [
    {
      files: ['**/*.scss', '**/*.css', '**/*.html', '**/*.yml'],
      options: {
        singleQuote: false,
      },
    },
  ],
});
