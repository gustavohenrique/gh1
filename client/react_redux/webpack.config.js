var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app/scripts/index.jsx',
    './app/styles/main.css'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }, {
      test: /(\.scss|\.css)$/,
      loaders: ['style', 'css', 'sass']
      // loader: 'style!css!postcss'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'main.js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify('true'),
    })
  ],
  postcss: function () {
    return [autoprefixer];
  }
};