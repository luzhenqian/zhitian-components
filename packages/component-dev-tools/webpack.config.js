const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./index.ts",
  output: {
    filename: "temp/index.js",
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
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
    extensions: [".js", ".ts"],
  },
  /** @type {import('webpack-dev-server').Configuration} */
  devServer: {
    contentBase: path.resolve(__dirname, "."),
    port: 9000,
    inline: true,
    hot: true,
  },
};
