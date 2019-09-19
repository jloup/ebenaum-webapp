var webpack = require('webpack');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: __dirname + "/build/dist"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader', options: { configFile: 'tslint.json' } },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
};
