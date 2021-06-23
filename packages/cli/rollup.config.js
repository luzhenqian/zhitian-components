import path from "path";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import { preserveShebangs } from "rollup-plugin-preserve-shebangs";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

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
  plugins: [commonjs(), resolve(), terser(), preserveShebangs(), json()],
};
