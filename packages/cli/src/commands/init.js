const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const hbs = require("handlebars");
const chalk = require("chalk");
const logSymbols = require("log-symbols");

module.exports = (projectName) => {
  const destDir = process.cwd();
  const targetDir = path.join(destDir, "./", projectName);
  if (fs.existsSync(targetDir)) {
    console.log(
      logSymbols.error,
      chalk.red(`init project failed, ${projectName} is occupied!`)
    );
    return;
  }

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
      fs.mkdirSync(targetDir);
      const tmplDir = path.join(__dirname, "../../templates/init");
      copy(tmplDir, targetDir, anwsers);
      console.log(
        logSymbols.success,
        chalk.green(`init project ${projectName} success!`)
      );
    });
};

function copy(tmplDir, targetDir, data) {
  fs.readdir(tmplDir, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const dir = path.join(tmplDir, file);
      if (fs.statSync(dir).isDirectory()) {
        const cTargetDir = path.join(targetDir, file);
        fs.mkdirSync(cTargetDir);
        copy(dir, cTargetDir, data);
      } else {
        const template = hbs.compile(
          fs.readFileSync(path.join(tmplDir, file)).toString()
        );
        const result = template(data);
        fs.writeFileSync(
          path.join(targetDir, file.replace(".hbs", "")),
          result
        );
      }
    });
  });
}
