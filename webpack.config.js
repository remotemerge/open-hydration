// init path module
const path = require('path');

// init copy plugin
const CopyPlugin = require('copy-webpack-plugin');
// init html plugin
const HtmlPlugin = require('html-webpack-plugin');
// init css extract plugin
const CssPlugin = require('mini-css-extract-plugin');

// init merge plugin
const {merge} = require('webpack-merge');

// build environment
const isProduction = process.env.NODE_ENV === 'production';

// common configs
const commonConfig = (useHash = true) => ({
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[' + (isProduction && useHash ? 'contenthash' : 'name') + '].js',
  },
  plugins: [
    new CssPlugin({
      filename: 'css/[' + (isProduction ? 'contenthash' : 'name') + '].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: isProduction ? CssPlugin.loader : 'style-loader',
          },
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|gif|jpe?g|otf|png|svg|ttf|webp|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: `static/[contenthash]-[name][ext]`,
        },
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, './'),
      '@': path.join(__dirname, './'),
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
  },
  performance: {
    hints: isProduction ? false : 'warning',
  },
  optimization: {
    runtimeChunk: false,
    minimize: isProduction,
  },
  devtool: false,
});

// background configs
const backgroundConfig = () =>
  merge(commonConfig(false), {
    entry: {
      worker: './src/background/index.ts',
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: './public/icons',
            to: 'icons',
            toType: 'dir',
          },
          {
            from: './public/_locales',
            to: '_locales',
            toType: 'dir',
          },
        ],
      }),
    ],
  });

// content configs
const contentConfig = () =>
  merge(commonConfig(false), {
    entry: {
      content: './src/content/index.ts',
    },
  });

// option configs
const optionConfig = (argv) =>
  merge(commonConfig(argv), {
    entry: {
      option: './src/option/index.js',
    },
    plugins: [
      new HtmlPlugin({
        filename: 'option.html',
        template: 'src/option/index.html',
        inject: true,
        chunks: ['option'],
      }),
    ],
  });

// popup configs
const popupConfig = () =>
  merge(commonConfig(true), {
    entry: {
      popup: './src/popup/index.js',
    },
    plugins: [
      new HtmlPlugin({
        filename: 'popup.html',
        template: 'src/popup/index.html',
        inject: true,
        chunks: ['popup'],
      }),
    ],
  });

// export multiple configs
module.exports = () => [backgroundConfig(), contentConfig(), optionConfig(), popupConfig()];
