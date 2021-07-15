const fs = require("fs");
const path = require("path");
const commonjs = require("rollup-plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const alias = require("@rollup/plugin-alias");
const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("rollup-plugin-typescript");
const del = require("rollup-plugin-delete");
const transformBuiltinClasses = require("babel-plugin-transform-builtin-classes");
const { visualizer } = require("rollup-plugin-visualizer");

const cmdPath = process.cwd();

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: path.resolve(cmdPath, pkgPath, "./src/index.ts"),
  output: [
    {
      exports: "auto",
      file: path.resolve(cmdPath, pkg.module),
      format: "esm",
    },
  ],
  plugins: [
    transformBuiltinClasses({
      global: ["HTMLElement"],
    }),
    resolve.default(),
    typescript(),
    commonjs(),
    alias({
      entries: [{ find: "@", replacement: path.resolve(__dirname, "../../") }],
    }),
    terser(),
    del({ targets: "dist/*" }),
    visualizer(),
  ],
  preserveEntrySignatures: "strict",
};
