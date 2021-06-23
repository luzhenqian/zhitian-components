const path = require("path");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");

module.exports = function () {
  webpackConfigPath = path.resolve(__dirname, "./config/webpack.config.ztc.js");

  const config = require(webpackConfigPath);

  const wds = new webpackDevServer(webpack(config), config.devServer);
  wds.listen(config.devServer.port, "0.0.0.0", () => {
    console.log(111);
  });
};
