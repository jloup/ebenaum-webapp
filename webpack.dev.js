const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: "source-map",
  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: [/node_modules/] }
    ]
  },
  plugins: [
   new webpack.DefinePlugin({
      'API_URL': JSON.stringify('http://localhost:3002/api/v1'),
    })
  ]
});

