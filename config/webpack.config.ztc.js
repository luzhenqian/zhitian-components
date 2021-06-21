const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./main.js",
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
            loader: require.resolve("../packages/compiler/src/loader/ztc.js"),
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
      "@": path.resolve(__dirname, "../"),
    },
    extensions: ["", ".js", ".jsx", ".ztc", ".vue"],
  },
  plugins: [new VueLoaderPlugin()],
};
