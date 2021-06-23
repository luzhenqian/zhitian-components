const path = require("path");
const  { terser } = require("rollup-plugin-terser");
const resolve = require("@rollup/plugin-node-resolve");
const { preserveShebangs } = require("rollup-plugin-preserve-shebangs");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: path.resolve(__dirname, "./src/index.js"),
  output: [
    {
      exports: "auto",
      file: path.resolve(__dirname, "./bin/index.js"),
      format: "cjs",
    },
  ],
  plugins: [commonjs(), resolve.default(), terser(), preserveShebangs(), json()],
};
