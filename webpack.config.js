const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => ({
  entry: './src/game/index.ts',
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./docs")
  },

  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    port: 9000
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
  },
  plugins: [
    new CopyPlugin([
      {
        from: './src/index.html',
        to: './'
      },
      {
        from: './src/index.css',
        to: './'
      }
    ])
  ]
});
