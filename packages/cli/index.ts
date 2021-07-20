import { program } from "commander";
import path from "path";
import chalk from "chalk";

import init from "./lib/init";
import create from "./lib/create";
import dev from "./lib/dev";
import build from "./lib/build";
import publish from "./lib/publish";

const pkgConfig = require(path.resolve(__dirname, "../package.json"));
const version = pkgConfig.version;

console.log(chalk.blue(`ZTC CLI ${version}`));

program.option("-v, --version", "output the version number").action(() => {
  console.log(`${pkgConfig.name} ${version}`);
});

program
  .command("init <component-lib-name>")
  .description("create a new component lib")
  .action((componentLibName: string) => {
    init(componentLibName, pkgConfig);
  });

program
  .command("create <component-name>")
  .description("create a new component")
  .action((componentName) => {
    create(componentName);
  });

program
  .command("dev")
  .description("start a development mode server with zero config")
  .action(() => {
    dev();
  });

program
  .command("build")
  .description("build your component library")
  .action(() => {
    build();
  });

program
  .command("publish")
  .description("publish your component library")
  .action(() => {
    publish();
  });

program.parse(process.argv);
