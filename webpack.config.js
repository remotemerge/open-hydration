// init path module
const path = require('path');
// init fs module
const fs = require('fs');

// init copy plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
// init html plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// init css extract plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// init merge plugin
const merge = require('webpack-merge');

// build environment
const isProduction = process.env.NODE_ENV === 'production';

// common configs
const commonConfig = (hashName = true) => ({
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/[' + (isProduction && hashName ? 'hash' : 'name') + '].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[' + (isProduction ? 'hash' : 'name') + '].css',
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProduction,
            },
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
          'postcss-loader',
        ]
      },
      {
        test: /\.(woff|woff2|otf|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[' + (isProduction ? 'hash' : 'name') + '].[ext]',
              outputPath: './fonts/',
              publicPath: '/fonts/',
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[' + (isProduction ? 'hash' : 'name') + '].[ext]',
          outputPath: './images/',
          publicPath: '/images/',
        }
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, './'),
      '@': path.join(__dirname, './')
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json', '.scss']
  },
  performance: {
    hints: isProduction ? false : 'warning'
  },
  optimization: {
    runtimeChunk: false,
    minimize: isProduction,
  },
  devtool: false,
});

// background configs
const backgroundConfig = (argv) => merge(commonConfig(argv), {
  entry: {
    'app': './src/background/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'background.html',
      template: 'src/background/index.html',
      inject: true,
      chunks: ['app']
    }),
    new CopyWebpackPlugin([
      {
        from: './public/assets',
        to: 'assets',
        toType: 'dir',
      },
      {
        from: './public/_locales',
        to: '_locales',
        toType: 'dir',
      },
    ]),
  ],
});

// content configs
const contentConfig = () => merge(commonConfig(false), {
  entry: {
    'content': './src/content/index.js',
  },
});

// option configs
const optionConfig = (argv) => merge(commonConfig(argv), {
  entry: {
    'app': './src/option/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'option.html',
      template: 'src/option/index.html',
      inject: true,
      chunks: ['app']
    }),
  ],
});

// popup configs
const popupConfig = (argv) => merge(commonConfig(argv), {
  entry: {
    'app': './src/popup/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup/index.html',
      inject: true,
      chunks: ['app']
    }),
  ],
});

// export multiple configs
module.exports = (env, argv) => [backgroundConfig(argv), contentConfig(argv), optionConfig(argv), popupConfig(argv)];
