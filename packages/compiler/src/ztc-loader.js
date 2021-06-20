const cheerio = require('cheerio');
const ztcCompiler = require('./index');

const {generateCode ,peelOffImps,insertProps}= ztcCompiler

module.exports = function (source) {
  const $ = cheerio.load(source)

  let [scriptData, imps] = peelOffImps($('script').contents()[0].data)

  const component = $('component')[0]
  const componentName = component.attribs.name

  const styleData = $('style').html()

  const rawComponentData = $(component).html()

  const componentData = insertProps(rawComponentData)

  const code = generateCode(imps, componentName, componentData, scriptData, styleData, this.resourcePath)

  return code
}