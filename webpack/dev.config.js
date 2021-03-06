const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../app'),
  target: 'electron-main',
  devtool: 'inline-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/main/js/index.js',
      './src/main/res/scss/style.scss',
      './src/main/res/scss/vendors/font-awesome/font-awesome.scss',
      './src/main/res/scss/vendors/chart.js/chart.scss'
    ],
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './app/build'),
    filename: 'app.bundle.js',
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    hot: true,
    publicPath: 'http://localhost:8080/',
    historyApiFallback: true,
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
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.css$/,
      use: ['css-loader'],
    },
    {
      test: /\.svg$/,
      use: ['react-svg-loader']
    },
    {
      test: /\.(ttf|woff|woff2|eot)$/,
      use: [{
        loader: 'file-loader',
        options: {}
      }]
    },
    {
      test: /\.(png|jpg|gif|ico)$/,
      use: [{
        loader: 'file-loader',
        options: {}
      }]
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([{
        from: './src/main/app.js',
      },
      {
        from: './src/main/index.html',
      },
      ]),
  ],
};
