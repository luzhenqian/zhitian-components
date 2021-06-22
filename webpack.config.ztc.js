const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./examples/main.js",
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                { pragma: "createElement" },
              ],
            ],
          },
        },
      },
      {
        test: /\.ztc$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                [
                  "@babel/plugin-transform-react-jsx",
                  { pragma: "createElement" },
                ],
              ],
            },
          },
          {
            loader: "@ztc/ztc-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
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
    extensions: ["", ".js", ".jsx", ".ztc", ".vue"],
  },
  plugins: [new VueLoaderPlugin()],
  /** @type {import('webpack-dev-server').Configuration} */
  devServer: {
    open: "chrome",
    contentBase: "./examples/",
    port: 9000,
    inline: true,
    hot: true,
  },
};
