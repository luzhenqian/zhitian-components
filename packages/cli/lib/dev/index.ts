import path from "path";
import chalk from "chalk";
const webpack = require("webpack"); // this module does not support esm.
const webpackDevServer = require("webpack-dev-server"); // this module does not support esm.

export default () => {
  console.log(chalk.bold("🚀  run "));

  const webpackConfigPath = path.resolve(
    __dirname,
    "./config/webpack.config.js"
  );
  const config = require(webpackConfigPath);
  const wds = new webpackDevServer(webpack(config), config.devServer);
  wds.listen(config.devServer.port, "0.0.0.0", () => {});
};
