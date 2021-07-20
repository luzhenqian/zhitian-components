import fs from "fs";
import path from "path";
import { copyFileWithHBS, toBigHump, toLowerLine } from "./helpers";
import log from "./log";

export default async (componentName: string) => {
  const destDir = process.cwd();
  const targetDir = path.join(destDir, componentName);

  if (fs.existsSync(targetDir)) {
    log.error(`Create component failed, ${componentName} is occupied!`);
    return;
  }

  fs.mkdirSync(targetDir);

  const tmplDir = path.join(__dirname, "../templates/component");

  const componentLibPkgConfig = require(path.resolve(
    process.cwd(),
    "./package.json"
  ));

  const componentLibName = componentLibPkgConfig.name;
  const data = {
    pkgName: genPkgName(componentLibName, componentName),
    componentName: toLowerLine(
      genComponentName(componentLibName, componentName)
    ),
    componentNameBigHump: toBigHump(
      genComponentName(componentLibName, componentName)
    ),
  };

  const result = await copyFileWithHBS(tmplDir, targetDir, data);

  if (result !== null) {
    log.error(`Create component failed, failed reason: ${result.message}`);
    return;
  }

  log.success(`Create component ${componentName} success!`);
};

function genPkgName(name: string, componentName: string): string {
  const prefix = name.slice(name.lastIndexOf("/") + 1, name.length);
  return `${prefix}/${toLowerLine(componentName)}`;
}

function genComponentName(name: string, componentName: string): string {
  const prefix = name.slice(name.lastIndexOf("/") + 1, name.length);
  return prefix + toBigHump(componentName);
}
