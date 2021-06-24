import fs from "fs";
import path from "path";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

const rootPath = path.resolve(__dirname, "packages");

const notBuild = ['cli']

/** @type {import('rollup').RollupOptions} */
module.exports = fs
  .readdirSync(rootPath)
  .filter((dir) => fs.statSync(path.resolve(rootPath, dir)).isDirectory())
  .filter(dir => !notBuild.includes(dir))
  .map((pkgPath) => {
    if (fs.existsSync(path.resolve(rootPath, pkgPath, "./rollup.config.js"))) {
      return require(path.resolve(rootPath, pkgPath, "./rollup.config.js"));
    }
    const pkg = require(path.resolve(rootPath, pkgPath, "package.json"));
    return {
      input: path.resolve(rootPath, pkgPath, "index.js"),
      output: [
        {
          exports: "auto",
          file: path.resolve(rootPath, pkgPath, pkg.main),
          format: "cjs",
        },
        {
          exports: "auto",
          file: path.join(rootPath, pkgPath, pkg.module),
          format: "es",
        },
      ],
      plugins: [
        commonjs(),
        resolve(),
        alias({
          entries: [{ find: "@", replacement: path.resolve(__dirname, ".") }],
        }),
        terser(),
        json(),
      ],
    };
  });
