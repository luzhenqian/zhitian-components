import fs from "fs";
import path from "path";
import hbs from "handlebars";

function copyFileWithHBS(tmplDir, targetDir, data) {
  fs.readdir(tmplDir, (err, files) => {
    if (err) throw err;
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
  });
}

function fristUpperCase(str) {
  if (str === "") return str;
  return (([first, ...rest]) => first.toUpperCase() + rest.join(""))(
    str.split("")
  );
}

function toLowerLine(str) {
  if (str === "") return str;
  let temp = str.replace(/[A-Z]/g, function (match) {
    return "-" + match.toLowerCase();
  });
  if (temp.slice(0, 1) === "-") {
    temp = temp.slice(1);
  }
  return temp;
}

function toBigHump(str) {
  if (str === "") return str;
  let temp = str.replace(/\b(-\w)|(_\w)/g, function (match) {
    return match.substring(1).toUpperCase();
  });
  return fristUpperCase(temp);
}

export { copyFileWithHBS, fristUpperCase, toLowerLine, toBigHump };
