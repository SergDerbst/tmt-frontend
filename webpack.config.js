const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
      main: "./src/index.ts",
      vendor: "./src/vendor.js"
  },
  resolve: {
    extensions: [".js",".ts"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]

      },
      {
        test: /\.ts$/,
        enforce: "pre",
        loader: "tslint-loader"
      },
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: "initial",
          name: "vendor",
          test: "vendor"
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "body"
    })
  ]
};