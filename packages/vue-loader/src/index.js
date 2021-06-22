const cheerio = require("cheerio");
const utils = require("@/packages/compiler/src/transforms/utils");
const codeGen = require("@/packages/compiler/src/transforms/vue.js");
const fs = require("fs");

const { peelOffImps, insertProps } = utils;

module.exports = function (content) {
  const originalContent = fs.readFileSync(this.resourcePath).toString();

  const $ = cheerio.load(originalContent);

  let [scriptData, imps] = peelOffImps($("script").contents()[0].data);

  [content] = peelOffImps(content);
  content = deleteBabelCodeExport(content);

  const component = $("component")[0];
  const componentName = component.attribs.name;

  const styleData = $("style").html();

  const rawComponentData = $(component).html();

  const componentData = insertProps(rawComponentData);

  const code = codeGen(
    content,
    imps,
    componentName,
    componentData,
    scriptData,
    styleData,
    this.resourcePath
  );

  return code;
};

function deleteBabelCodeExport(code) {
  const exportIdx = code.lastIndexOf("export");
  if (exportIdx !== -1) {
    return code.substring(0, exportIdx);
  } else {
    return code;
  }
}
