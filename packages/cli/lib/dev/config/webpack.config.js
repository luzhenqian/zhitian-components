const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = (() => {
  return {
    entry: path.resolve(process.cwd(), "./main.js"),
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
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
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
      extensions: ["", ".js", ".ts"],
    },
    /** @type {import('webpack-dev-server').Configuration} */
    devServer: {
      open: "chrome",
      contentBase: path.resolve(process.cwd(), "./"),
      port: 9000,
      inline: true,
      hot: true,
    },
  };
})();
