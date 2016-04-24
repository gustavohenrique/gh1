var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');


module.exports = {
  entry: './app/scripts/index',
  // context: path.join(__dirname, 'app'),
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      loader: 'react-hot!babel',
      include: path.join(__dirname, 'app', 'scripts'),
      exclude: path.join(__dirname, '/node_modules/')
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: ['app', 'node_modules']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'main.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify('false'),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  postcss: function () {
    return [autoprefixer];
  }
};