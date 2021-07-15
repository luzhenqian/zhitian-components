const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const copyFileWithHBS = require("./helper").copyFileWithHBS;
const toBigHump = require("./helper").toBigHump;
const toLowerLine = require("./helper").toLowerLine;

module.exports = (componentName) => {
  const destDir = process.cwd();
  const targetDir = path.join(destDir, componentName);
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

  const componentLibPkgConfig = require(path.resolve(
    process.cwd(),
    "./package.json"
  ));
  const componentLibName = componentLibPkgConfig.name;

  copyFileWithHBS(tmplDir, targetDir, {
    pkgName: genPkgName(componentLibName, componentName),
    componentName: genComponentName(componentLibName, componentName),
    componentName: toLowerLine(
      genComponentName(componentLibName, componentName)
    ),
    componentNameBigHump: toBigHump(
      genComponentName(componentLibName, componentName)
    ),
  });

  console.log(
    logSymbols.success,
    chalk.green(`create component ${componentName} success!`)
  );
};

function genPkgName(name, componentName) {
  const prefix = name.slice(name.lastIndexOf("/") + 1, name.length);
  return `${prefix}/${toLowerLine(componentName)}`;
}

function genComponentName(name, componentName) {
  const prefix = name.slice(name.lastIndexOf("/") + 1, name.length);
  return prefix + toBigHump(componentName);
}
