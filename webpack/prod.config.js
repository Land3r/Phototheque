const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  target: 'electron-main',
  devtool: 'source-map',
  entry: {
    app: [
      './src/main/js/index.js',
      './src/main/res/scss/style.scss',
      './src/main/res/scss/vendors/font-awesome/font-awesome.scss',
      './src/main/res/scss/vendors/chart.js/chart.scss'
    ],
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../app/build'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
    },
    {
      test: /\.css$/,
      use: ['css-loader'],
    },
    {
      test: /\.(ttf|woff|woff2|eot)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/'
        }
      }]
    },
    {
      test: /\.(png|jpg|gif|svg|ico)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'images/',
        }
      }]
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MinifyPlugin(),
    new ExtractTextPlugin('css/style.css'),
    new CopyWebpackPlugin([
      {
        // Electron launcher.
        from: './src/main/app.js',
        to: path.join(__dirname, '../app/build')
      },
      {
        // Site main page.
        from: './src/main/index.html',
        to: path.join(__dirname, '../app/build')
      },
      {
        // Application configuration file.
        from: './src/main/electron-config.json',
        to: path.join(__dirname, '../app/build')
      },
      {
        // Application icon.
        from: './src/main/res/images/appIcon.ico',
        to: path.join(__dirname, '../app/build/icon.ico')
      }
    ]),
  ]
};
