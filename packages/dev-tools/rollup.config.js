const path = require("path");
const commonjs = require("rollup-plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("rollup-plugin-typescript");
const del = require("rollup-plugin-delete");
const { visualizer } = require("rollup-plugin-visualizer");

const pkg = require(path.resolve(__dirname, "./package.json"));

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: path.resolve(__dirname, "./index.ts"),
  output: [
    {
      exports: "named",
      file: path.resolve(__dirname, pkg.main),
      format: "cjs",
    },
    {
      exports: "named",
      file: path.resolve(__dirname, pkg.module),
      format: "esm",
    },
  ],
  plugins: [
    resolve.default(),
    typescript(),
    commonjs(),
    terser(),
    del({ targets: "dist/*" }),
    visualizer(),
  ],
  preserveEntrySignatures: "strict",
};
