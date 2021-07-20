import fs from "fs";
import path from "path";
const inquirer = require("inquirer"); // this module does not support esm.
import chalk from "chalk";
import { copyFileWithHBS } from "./helpers";
import log from "./log";
// const { spawn } = require("child_process");

export default async (componentLibName: string, pkgConfig: any) => {
  const destDir = process.cwd();
  const targetDir = path.join(destDir, "./", componentLibName);
  if (fs.existsSync(targetDir)) {
    log.error(`Init project failed, ${componentLibName} is occupied!`);
    return;
  }

  const anwsers = await inquirer.prompt([
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
  ]);

  anwsers.version = pkgConfig.version;
  console.log(`✨  Creating component lib in ${targetDir}`);

  fs.mkdirSync(targetDir);
  const tmplDir = path.join(__dirname, "../templates/init");
  const result = await copyFileWithHBS(tmplDir, targetDir, anwsers);

  if (result !== null) {
    log.error(`Create project failed, failed reason: ${result.message}`);
    return;
  }
  // TODO: install dependencies
  // const cmd = spawn(`cd ${targetDir} && yarn`, [], { stdio: "inherit" });

  console.log(
    chalk.white(
      `🎉  Successfully created component lib`,
      chalk.green(componentLibName),
      "."
    )
  );

  console.log(chalk.white(`👉  Get started with the following commands:\n`));
  console.log(chalk.gray(`$ `), chalk.blue(`cd ${componentLibName}`));
  console.log(chalk.gray(`$ `), chalk.blue(`yarn`));
  console.log(chalk.gray(`$ `), chalk.blue(`yarn dev`));
};
