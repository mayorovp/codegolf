var webpack = require("webpack");

module.exports = {
  entry: ["file?name=README.md!./nested-loader?eval!./build.js"],
  output: {
    filename: "README2.md",
    path: "./package",
    publicPath: "http://mayorovp.github.io/codegolf/",
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  }
}