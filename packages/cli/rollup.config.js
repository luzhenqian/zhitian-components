const path = require("path");
const commonjs = require("rollup-plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const alias = require("@rollup/plugin-alias");
const json = require("@rollup/plugin-json");
const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("rollup-plugin-typescript");
const del = require("rollup-plugin-delete");
const { visualizer } = require("rollup-plugin-visualizer");
const copy = require("rollup-plugin-copy");

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
  ],
  plugins: [
    resolve.default({ preferBuiltins: true }),
    typescript(),
    commonjs(),
    alias({
      entries: [{ find: "@", replacement: path.resolve(__dirname, "../../") }],
    }),
    terser(),
    del({ targets: "dist/*" }),
    visualizer(),
    json(),
    copy({
      targets: [
        {
          src: "./lib/dev/webpack.config.js",
          dest: path.resolve(getPath(pkg.main), "./config"),
        },
      ],
    }),
  ],
  preserveEntrySignatures: "strict",
};

function getPath(fullPath) {
  if (fullPath === "") return "";
  const basename = path.basename(fullPath);
  return fullPath.replace(basename, "");
}
