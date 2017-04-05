// eslint-disable-next-line strict
'use strict';

const webpack      = require('webpack');
const path         = require('path');
const autoprefixer = require('autoprefixer');

// Load Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');
const styleLintPlugin   = require('stylelint-webpack-plugin');

// Settings
const appEnv            = process.env.NODE_ENV || 'development';
const appPath           = path.join(__dirname, 'app');
const distPath          = path.join(__dirname, 'dist');
const cachePath         = path.join(__dirname, 'tmp/cache');
const assetsPathPattern = '[path][name].[hash].[ext]';
const distPathPattern   = '[name].[hash].js';
const exclude           = /node_modules/;

// Load the app config, default to `development`
let appConfig = require('./config/config');

appConfig = appConfig[appEnv] || appConfig.development;

const config = {

  // The base directory for resolving `entry` (must be absolute path)
  context: appPath,

  entry: {
    app: 'app.js'
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // Set proper base URL for serving resources
    publicPath: '/',
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: distPathPattern
  },

  plugins: [

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'app.html',
      filename: 'index.html',
      // favicon: 'assets/img/favicon.ico'
    }),

    // Lint CSS/SCSS files
    new styleLintPlugin({
      syntax: 'scss'
    }),

    // Do not output to dist if there are errors
    new webpack.NoErrorsPlugin(),

    // Define global variables that will be available in any chunk
    new webpack.DefinePlugin({
      // Used by React to cleanup debugging properties when using `production`
      'process.env': {
        NODE_ENV: JSON.stringify(appEnv),
        API_URL: JSON.stringify(appConfig.API_URL)
      }
    })
  ],

  // Options affecting the resolving of modules
  resolve: {
    // Enable resolving modules relative to these paths
    root: [appPath]
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: [
          'eslint'
        ],
        exclude
      }
    ],

    loaders: [
      // Expose React as global object
      {
        test: require.resolve('react'),
        loader: 'expose?React'
      },

      // Transpile ES6 and enable Hot Reload
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel?cacheDirectory=' + encodeURIComponent(cachePath)
        ],
        exclude: exclude
      },

      // Allow `require`ing JSON files as objects
      {
        test: /\.json$/,
        loader: 'json',
        exclude: exclude
      },

      // Allow `require`ing SCSS files
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?root=' + encodeURIComponent(appPath),
          'postcss',
          'sass?includePaths[]=' + encodeURIComponent(appPath)
        ],
        exclude: exclude
      },

      // Allow `require`ing CSS files
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?root=' + encodeURIComponent(appPath)
        ],
        exclude: /flexboxgrid/
      },

      // Load flexbox grid css files
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules'
        ],
        include: /flexboxgrid/
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff2?|ttf|otf)(\?.*)?$/i,
        loader: 'url?limit=5120&name=' + assetsPathPattern
      }
    ]
  },

  // Specify dependencies that shouldn’t be resolved by webpack
  externals: [],

  // Settings for webpack-dev-server
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    port: process.env.DEV_SERVER_PORT || 9000,
    contentBase: appPath,
    colors: true,
    noInfo: true,
    inline: true,
    historyApiFallback: {
      index: '/'
    }
  },

  eslint: {
    configFile: '.eslintrc'
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};

if (appEnv === 'development') {
  config.devtool = '#inline-source-map';
}

if (appEnv === 'production') {
  config.plugins.push(
    // Remove build folder
    new CleanPlugin(['dist'])
  );
}

module.exports = config;
