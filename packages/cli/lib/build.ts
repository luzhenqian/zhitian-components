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

  const esmOutputOption = {
    exports: "auto",
    file: path.resolve(cmdPath, pkg.module),
    format: "esm",
  };

  const esOutputOption = {
    exports: "auto",
    file: path.resolve(cmdPath, pkg.main),
    name: pkg.name,
    format: "umd",
  };

  const bundle = await rollup(inputOption);

  const esmSpinner = ora(
    `Building ${chalk.blue(inputOption.input)} → ${chalk.blue(
      esmOutputOption.file
    )}`
  ).start();
  await bundle.write(esmOutputOption);
  esmSpinner.succeed(`Build ${chalk.blue(esmOutputOption.file)} done`);

  const esSpinner = ora(
    `Building ${chalk.blue(inputOption.input)} → ${chalk.blue(
      esOutputOption.file
    )}`
  ).start();
  await bundle.write(esOutputOption);
  esSpinner.succeed(`Build ${chalk.blue(esOutputOption.file)} done`);
  // TODO: record time
  // created packages\cli\dist\cli.cjs.js in 7.6s
  await bundle.close();
};
