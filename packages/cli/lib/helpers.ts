import fs from "fs";
import path from "path";
import hbs from "handlebars";

function copyFileWithHBS(
  tmplDir: string,
  targetDir: string,
  data: any
): Promise<Error | null> {
  return new Promise((resovle, reject) =>
    fs.readdir(tmplDir, (err: Error | null, files: string[]) => {
      if (err) reject(err);
      files.forEach((file) => {
        const dir = path.join(tmplDir, file);
        if (fs.statSync(dir).isDirectory()) {
          const cTargetDir = path.join(targetDir, file);
          fs.mkdirSync(cTargetDir);
          copyFileWithHBS(dir, cTargetDir, data);
        } else {
          const template = hbs.compile(
            fs.readFileSync(path.join(tmplDir, file)).toString()
          );
          const result = template(data);
          fs.writeFileSync(
            path.join(targetDir, file.replace(".hbs", "")),
            result
          );
        }
      });
      resovle(null);
    })
  );
}

function fristUpperCase(str: string): string {
  if (str === "") return str;
  return (([first, ...rest]) => first.toUpperCase() + rest.join(""))(
    str.split("")
  );
}

function toLowerLine(str: string): string {
  if (str === "") return str;
  let temp = str.replace(/[A-Z]/g, function (match) {
    return "-" + match.toLowerCase();
  });
  if (temp.slice(0, 1) === "-") {
    temp = temp.slice(1);
  }
  return temp;
}

function toBigHump(str: string): string {
  if (str === "") return str;
  let temp = str.replace(/\b(-\w)|(_\w)/g, function (match) {
    return match.substring(1).toUpperCase();
  });
  return fristUpperCase(temp);
}

export { copyFileWithHBS, fristUpperCase, toLowerLine, toBigHump };
