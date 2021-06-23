const fs = require("fs");
const path = require("path");
const hbs = require("handlebars");

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

const fristUpperCase = (str) => {
  if (str === "") return str;
  return (([first, ...rest]) => first.toUpperCase() + rest.join(""))(
    str.split("")
  );
};

module.exports = { copyFileWithHBS, fristUpperCase };
