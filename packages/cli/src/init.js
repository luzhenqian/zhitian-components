const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const copyFileWithHBS = require("./helper").copyFileWithHBS;
const { spawn } = require("child_process");

module.exports = (componentLibName) => {
  const destDir = process.cwd();
  const targetDir = path.join(destDir, "./", componentLibName);
  if (fs.existsSync(targetDir)) {
    console.log(
      logSymbols.error,
      chalk.red(`Init project failed, ${componentLibName} is occupied!`)
    );
    return;
  }

  const pkgConfig = require(path.resolve(targetDir, "../../package.json"));
  const version = pkgConfig.version;
  console.log(chalk.blue(`ZTC CLI ${version}`));

  inquirer
    .prompt([
      {
        type: "input",
        name: "componentLibName",
        message: "ComponentLib name?",
      },
      {
        type: "input",
        name: "companyName",
        message: "company name?",
      },
      {
        type: "input",
        name: "description",
        message: "project description?",
      },
      {
        type: "input",
        name: "author",
        message: "author name?",
      },
    ])
    .then((anwsers) => {
      console.log(`✨  Creating component lib in ${targetDir}`);

      fs.mkdirSync(targetDir);
      const tmplDir = path.join(__dirname, "../templates/init");
      copyFileWithHBS(tmplDir, targetDir, anwsers);

      // TODO: install dependencies
      // const cmd = spawn(`cd ${targetDir} && yarn`, [], { stdio: "inherit" });

      console.log(
        chalk.white(
          `🎉  Successfully created component lib`,
          chalk.green(componentLibName),
          "."
        )
      );

      console.log(
        chalk.white(`👉  Get started with the following commands:\n`)
      );
      console.log(chalk.gray(`$ `), chalk.blue(`cd ${componentLibName}`));
      console.log(chalk.gray(`$ `), chalk.blue(`yarn`));
      console.log(chalk.gray(`$ `), chalk.blue(`yarn dev`));
    });
};
