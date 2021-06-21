const cheerio = require("cheerio");
const utils = require("../transforms/utils");
const codeGen = require("../transforms/ztc");

const { peelOffImps, insertProps } = utils;

module.exports = function (source) {
  const $ = cheerio.load(source);

  let [scriptData, imps] = peelOffImps($("script").contents()[0].data);

  const component = $("component")[0];
  const componentName = component.attribs.name;

  const styleData = $("style").html();

  const rawComponentData = $(component).html();

  const componentData = insertProps(rawComponentData);

  const code = codeGen(
    imps,
    componentName,
    componentData,
    scriptData,
    styleData,
    this.resourcePath
  );

  return code;
};
