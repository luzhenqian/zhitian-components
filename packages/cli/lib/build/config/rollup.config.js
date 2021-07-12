const fs = require("fs");
const path = require("path");
const commonjs = require("rollup-plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const alias = require("@rollup/plugin-alias");
const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("rollup-plugin-typescript");
const del = require("rollup-plugin-delete");
const { visualizer } = require("rollup-plugin-visualizer");

const cmdPath = process.cwd();

/** @type {import('rollup').RollupOptions} */
module.exports = fs
  .readdirSync(path.resolve(cmdPath, "./packages"))
  .map((pkgPath) => {
    const pkg = require(path.resolve("./packages", pkgPath, "./package.json"));
    return {
      input: path.join(pkgPath, "./src/index.ts"),
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
      ],
      plugins: [
        resolve.default(),
        typescript(),
        commonjs(),
        alias({
          entries: [
            { find: "@", replacement: path.resolve(__dirname, "../../") },
          ],
        }),
        terser(),
        del({ targets: "dist/*" }),
        visualizer(),
      ],
      preserveEntrySignatures: "strict",
    };
  });
