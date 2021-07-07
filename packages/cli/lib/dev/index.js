const path = require("path");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");

module.exports = function () {
  let webpackConfigPath;

  webpackConfigPath = path.resolve(__dirname, "./config/webpack.config.js");

  const config = require(webpackConfigPath);

  const wds = new webpackDevServer(webpack(config), config.devServer);
  wds.listen(config.devServer.port, "0.0.0.0", () => {});
};
