// init path module
const path = require('path');

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
const commonConfig = () => ({
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/[' + (isProduction ? 'hash' : 'name') + '].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[' + (isProduction ? 'hash' : 'name') + '].css',
    }),
  ],
  module: {
    rules: [
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
    'background': './src/js/background.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'background.html',
      template: 'src/background.html',
      inject: true,
      chunks: ['background']
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        to: 'assets',
        toType: 'dir',
      },
      {
        from: './src/_locales',
        to: '_locales',
        toType: 'dir',
      },
      {
        from: './src/manifest.json',
        to: 'manifest.json',
        toType: 'file',
      }
    ]),
  ],
});

// content configs
const contentConfig = (argv) => merge(commonConfig(argv), {
  entry: {
    'content': './src/js/content.js',
  },
});

// option configs
const optionConfig = (argv) => merge(commonConfig(argv), {
  entry: {
    'option': './src/js/option.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'option.html',
      template: 'src/option.html',
      inject: true,
      chunks: ['option']
    }),
  ],
});

// popup configs
const popupConfig = (argv) => merge(commonConfig(argv), {
  entry: {
    'popup': './src/js/popup.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup.html',
      inject: true,
      chunks: ['popup']
    }),
  ],
});

// export multiple configs
module.exports = (env, argv) => [backgroundConfig(argv), contentConfig(argv), optionConfig(argv), popupConfig(argv)];
