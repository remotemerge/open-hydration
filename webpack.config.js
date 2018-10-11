const path = require('path');
const webpack = require('webpack');

// files copier
const CopyWebpackPlugin = require('copy-webpack-plugin');
// uglify plugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// html helper/copier
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack css extractor
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// use mini css in production
let getStyleLoader = (argv) => {
    return (argv.mode === 'production') ? MiniCssExtractPlugin.loader : 'style-loader';
};

module.exports = (env, argv) => ({
    entry: {
        'background': './src/js/background.js',
        'content': './src/js/content.js',
        'option': ['./src/js/option.js', './src/styles/option.scss'],
        'popup': ['./src/js/popup.js', './src/styles/popup.scss']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    plugins: [
        // webpack css extractor
        (argv.mode === 'production') ? new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }) : new webpack.DefinePlugin({}),
        // define global variables
        new webpack.DefinePlugin({
            'isDev': (argv.mode === 'development')
        }),
        new HtmlWebpackPlugin({
            filename: 'background.html',
            template: 'src/background.html',
            inject: true,
            chunks: ['background']
        }),
        new HtmlWebpackPlugin({
            filename: 'option.html',
            template: 'src/option.html',
            inject: true,
            chunks: ['option']
        }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: 'src/popup.html',
            inject: true,
            chunks: ['popup']
        }),
        // copy static files
        new CopyWebpackPlugin([
            {from: './src/assets', to: 'assets'},
            {from: './src/_locales', to: '_locales'},
            {from: './src/manifest.json', to: 'manifest.json'}
        ])
    ],
    watch: argv.mode !== 'production' || (argv.watch !== undefined && argv.watch === 'true'),
    module: {
        noParse: /lodash/,
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    getStyleLoader(argv),
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    getStyleLoader(argv),
                    'css-loader'
                ]
            },
            {
                test: /\.(woff|woff2|otf|eot|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './bundle/'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './bundle/'
                }
            }
        ]
    },
    resolve: {
        alias: {
            '~': path.join(__dirname, './'),
            '@': path.join(__dirname, './')
        },
        extensions: ['*', '.js', '.jsx', '.json', '.scss']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        overlay: true,
        noInfo: false,
        host: '127.0.0.1',
        port: 8090,
        proxy: {
            '/api/': 'http://127.0.0.1:8080'
        }
    },
    performance: {
        hints: false
    },
    optimization: {
        runtimeChunk: false,
        minimize: (argv.mode === 'production' && (argv.uglify === undefined || argv.uglify === 'true')),
        minimizer: (argv.mode === 'production' && (argv.uglify === undefined || argv.uglify === 'true')) ? [
            new UglifyJsPlugin({
                test: /\.js($|\?)/i,
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ] : [],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    devtool: (argv.mode === 'production') ? '' : '#source-map'
});