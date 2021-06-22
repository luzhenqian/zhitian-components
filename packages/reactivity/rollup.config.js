const path = require("path");
const { terser } = require("rollup-plugin-terser");
const alias = require("@rollup/plugin-alias");
const resolve = require("@rollup/plugin-node-resolve");

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: path.resolve(__dirname, "./index.js"),
  output: [
    {
      exports: "auto",
      file: path.resolve(__dirname, "./dist/reactivity.cjs.js"),
      format: "cjs",
    },
    {
      exports: "auto",
      file: path.resolve(__dirname, "./dist/reactivity.esm.js"),
      format: "es",
    },
  ],
  plugins: [
    resolve.default(),
    alias({
      entries: [{ find: "@", replacement: path.resolve(__dirname, "../../") }],
    }),
    terser(),
  ],
};
