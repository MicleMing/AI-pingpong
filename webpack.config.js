const path = require('path');

module.exports = env => ({
  entry: './src/game/index.ts',
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist")
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.(swf|ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/, use: ['file-loader'] },
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  }

});
