const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const copyFileWithHBS = require("./helper").copyFileWithHBS;
const fristUpperCase = require("./helper").fristUpperCase;

module.exports = (componentName) => {
  const destDir = process.cwd();
  const targetDir = path.join(destDir, "./packages/", componentName);
  if (fs.existsSync(targetDir)) {
    console.log(
      logSymbols.error,
      chalk.red(`Create component failed, ${componentName} is occupied!`)
    );
    return;
  }

  const pkgConfig = require(path.resolve(__dirname, "../package.json"));
  const version = pkgConfig.version;
  console.log(chalk.blue(`ZTC CLI ${version}`));

  fs.mkdirSync(targetDir);
  const tmplDir = path.join(__dirname, "../templates/component");

  copyFileWithHBS(tmplDir, targetDir, {
    componentName: genComponentName(pkgConfig.name, componentName),
  });

  console.log(
    logSymbols.success,
    chalk.green(`create component ${componentName} success!`)
  );
};

function genComponentName(name, componentName) {
  const prefix = name.slice(name.lastIndexOf("/") + 1, name.length);
  return prefix + fristUpperCase(componentName);
}
