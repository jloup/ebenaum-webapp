const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  performance: {
    maxAssetSize: 4000000,
    maxEntrypointSize: 4000000
  },
  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: [/node_modules/] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
    })
  ]
});

