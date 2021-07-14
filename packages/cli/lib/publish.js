const npm = require("npm");
const chalk = require("chalk");

module.exports = () => {
  require("child_process").exec("npm publish");
};
