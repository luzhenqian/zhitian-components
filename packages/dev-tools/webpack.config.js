const path = require("path");
// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./index.ts",
  output: {
    publicPath: "",
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
      // monaco editor
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
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
  // plugins: [new MonacoWebpackPlugin()],
  /** @type {import('webpack-dev-server').Configuration} */
  devServer: {
    contentBase: path.resolve(__dirname, "."),
    port: 9000,
    inline: true,
    hot: true,
  },
};
