// build environment
const buildEnv = process.env.NODE_ENV;

let plugins = [];
if (buildEnv === 'production') {
  plugins = [
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    }),
  ];
}

module.exports = {
  plugins: [
    require('autoprefixer'),
    ...plugins
  ]
};
