const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const copyFileWithHBS = require("../helper").copyFileWithHBS;
const { spawn } = require("child_process");
const ora = require("ora");
const { rollup } = require("rollup");

const commonjs = require("rollup-plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const alias = require("@rollup/plugin-alias");
const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("rollup-plugin-typescript");
const del = require("rollup-plugin-delete");
const { visualizer } = require("rollup-plugin-visualizer");

const cmdPath = process.cwd();
const plugins = [
  resolve.default(),
  typescript(),
  commonjs(),
  alias({
    entries: [{ find: "@", replacement: path.resolve(__dirname, "../../") }],
  }),
  terser(),
  del({ targets: "dist/*" }),
  visualizer(),
];

module.exports = async () => {
  // fs.readdirSync(cmdPath).forEach(async (pkgPath) => {
  const inputOption = {
    input: path.join(cmdPath, "./index.ts"),
    plugins,
  };

  const outputOption = {
    exports: "auto",
    file: path.resolve(cmdPath, "./dist/index.esm.js"),
    format: "esm",
  };

  const spinner = ora(
    `Building ${chalk.blue(inputOption.input)} -> ${chalk.blue(
      outputOption.file
    )}`
  ).start();
  const bundle = await rollup(inputOption);
  await bundle.write(outputOption);
  await bundle.close();
  spinner.succeed(`Building ${chalk.blue(inputOption.input)} done`);
  // });
};
