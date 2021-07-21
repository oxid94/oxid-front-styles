const path = require('path');
const pack = require('../package.json');
const { argv } = require('yargs');
const glob = require("glob");

const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssnanoPlugin = require('cssnano-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default


const isProduction = !!((argv.env && argv.env == 'production') || argv.production);
const config = Object.assign({ production: isProduction, development: !isProduction }, argv.env);

if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = config.production ? 'production' : 'development';
}

module.exports = function(webpackConf) {

    let webpack_config = {
        entry: webpackConf.entry,
        mode: config.production ? 'production' : 'development',
        devtool: config.production ? 'source-map' : undefined,
        watch: config.production ? false : true,
        output: webpackConf.output,
        optimization: {
            minimize: config.production,
            minimizer: [
                new TerserJSPlugin({
                    include: /\.min\.js$/,
                    parallel: true,
                    terserOptions: {
                        ecma: 8,
                        compress: {
                            drop_console: config.production,
                        },
                        output: {
                            comments: false
                        }
                    }
                }),
                new CssnanoPlugin({
                    test: /\.min\.css$/,
                    sourceMap: config.production,
                    preset: ['default', {
                        discardComments: {
                            removeAll: true,
                        },
                    }]
                }),
            ]
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'config/.eslintrc')
                    },
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: [
                        { loader: 'cache-loader' },
                        {
                            loader: 'babel-loader',
                            options: {
                                compact: true,
    
                                // Do not use the .babelrc configuration file.
                                babelrc: false,
    
                                // The loader will cache the results of the loader in node_modules/.cache/babel-loader.
                                cacheDirectory: true,
    
                                plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties'],
    
                                // List enabled ECMAScript feature sets.
                                presets: [
                                    ['@babel/preset-env', { loose: true, modules: false, targets: { browsers: pack.browserslist }, debug: false }]
                                ]
                            }
                        }
                    ]
                },
                { 
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                context: webpackConf.img.context,
                                outputPath: webpackConf.img.outputPath,
                                publicPath: webpackConf.img.publicPath,
                                useRelativePaths: true
                            }
                        }
                    ] 
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader', options: { sourceMap: config.production } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    parser: config.production ? 'postcss-safe-parser' : undefined,
                                    sourceMap: config.development,
                                    plugins: (loader) => [
                                        require('postcss-import')({ root: loader.resourcePath }),
                                        require('postcss-preset-env')({ browsers: pack.browserslist }),
                                        require('postcss-reporter')({ clearReportedMessages: true })
                                    ]
                                }
                            }
                        },
                        { loader: 'sass-loader', options: { sassOptions: { sourceComments: true, sourceMap: config.production } } }
                    ]
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
    
            new StyleLintPlugin({
                configFile: path.resolve(__dirname, 'config/.stylelintrc'),
                files: webpackConf.scss.path,
                syntax: 'scss',
                failOnError: false,
                quiet: false
            }),
    
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            }),
    
            new BrowserSyncPlugin(webpackConf.browsersSync),
    
            config.production ? new ImageminPlugin({
                externalImages: {
                    context: webpackConf.img.from, // Important! This tells the plugin where to "base" the paths at
                    sources: glob.sync(path.resolve(webpackConf.img.from, '**/*')),
                    destination: webpackConf.img.to,
                    fileName: '[path][name].[ext]' // (filePath) => filePath.replace('jpg', 'webp') is also possible
                },
                plugins: [
                    ["gifsicle", { optimizationLevel: 3, interlaced: true }],
                    ["jpegtran", { quality: 100, progressive: true }],
                    ["optipng", { optimizationLevel: 3, interlaced: true }],
                    ["svgo", {
                        plugins: [{
                            removeViewBox: false,
                            convertPathData: false,
                            removeDimensions: true,
                            removeStyleElement: true
                        }]
                    }],
                ],
            }) : new CopyPlugin({
              patterns: [
                { from: webpackConf.img.from, to: webpackConf.img.to },
              ],
            }),
    
            new FriendlyErrorsWebpackPlugin()
        ]
    }

    return webpack_config;
}
