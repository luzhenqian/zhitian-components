const path = require("path");
import commonjs from "rollup-plugin-commonjs";
const { terser } = require("rollup-plugin-terser");
const alias = require("@rollup/plugin-alias");
const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("rollup-plugin-typescript");
const pkg = require(path.resolve(__dirname, "./package.json"));

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: path.resolve(__dirname, "./index.ts"),
  output: [
    {
      exports: "auto",
      file: path.resolve(__dirname, pkg.main),
      format: "cjs",
    },
    {
      exports: "auto",
      file: path.resolve(__dirname, pkg.module),
      format: "esm",
    },
    // {
    //   file: path.resolve(__dirname, pkg.browser),
    //   format: "umd",
    // },
  ],
  plugins: [
    resolve.default(),
    commonjs(),
    alias({
      entries: [{ find: "@", replacement: path.resolve(__dirname, "../../") }],
    }),
    terser(),
    typescript(),
  ],
};
