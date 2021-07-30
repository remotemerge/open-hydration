// check build environment
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require('autoprefixer'),
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
