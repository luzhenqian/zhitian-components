import fs from "fs";
import path from "path";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";

const rootPath = path.resolve(__dirname, "packages");

/** @type {import('rollup').RollupOptions} */
module.exports = fs
  .readdirSync(rootPath)
  .filter((dir) => fs.statSync(path.resolve(rootPath, dir)).isDirectory())
  .map((pkgPath) => {
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
        alias({ "@": path.resolve(__dirname, "./") }),
        terser(),
        json(),
      ],
    };
  });
