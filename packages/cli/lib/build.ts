const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const { rollup } = require("rollup");
const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("rollup-plugin-typescript");
const commonjs = require("rollup-plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const del = require("rollup-plugin-delete");
const { visualizer } = require("rollup-plugin-visualizer");

const cmdPath = process.cwd();
const pkg = require(path.resolve(cmdPath, "./package.json"));
const plugins = [
  resolve.default(),
  typescript(),
  commonjs(),
  terser(),
  del({ targets: "dist/*" }),
  visualizer(),
];

export default async () => {
  const inputOption = {
    input: path.resolve(cmdPath, "./index.ts"),
    plugins,
  };

  const outputOption = {
    exports: "auto",
    file: path.resolve(cmdPath, pkg.module),
    format: "esm",
  };

  const spinner = ora(
    `Building ${chalk.blue(inputOption.input)} → ${chalk.blue(
      outputOption.file
    )}`
  ).start();
  const bundle = await rollup(inputOption);
  await bundle.write(outputOption);
  await bundle.close();
  spinner.succeed(`Building ${chalk.blue(inputOption.input)} done`);
};
