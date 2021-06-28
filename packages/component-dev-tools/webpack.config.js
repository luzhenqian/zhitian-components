const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./index.ts",
  output: {
    filename: "./.temp/index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
    ],
  },
  mode: "development",
  optimization: {
    minimize: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
    extensions: ["", ".js", ".jsx", ".ts"],
  },
  /** @type {import('webpack-dev-server').Configuration} */
  devServer: {
    open: "chrome",
    contentBase: "./",
    port: 9000,
    inline: true,
    hot: true,
  },
};
