// check build environment
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require('tailwindcss')('tailwind.config.js'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/*/components/*.jsx', './public/*.html'],
      defaultExtractor: (content) => content.match(/[\w\-:./]+/g) || [],
    }),
    // cssnano advanced
    isProduction
      ? require('cssnano')({
          preset: [
            'advanced',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        })
      : null,
  ],
};
