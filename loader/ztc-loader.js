const cheerio = require('cheerio');

module.exports = function (source) {

  const $ = cheerio.load(source)

  let scriptData = $('script').contents()[0].data
  const patternImport = new RegExp(/import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*;$/, 'mg')
  const impsArr = scriptData.match(patternImport)
  let impsStr = ''
  impsArr.forEach(imp => {
    scriptData = scriptData.replace(imp, '')
    impsStr += imp + `\n`
  });

  const component = $('component')

  const componentName = component[0].attribs.name
  const rawComponentData = component.html()

  const data = $('data')
  const style = $('style')
  const interaction = $('interaction')

  function insertProps(html) {
    const idx = html.indexOf('>')
    if (idx === -1) return html
    return html.slice(0, idx) + ' {...props} ' + html.slice(idx);
  }

  const componentData = insertProps(rawComponentData)

  const code = `
  import { createElement, ZTC } from "../core"
  ${impsStr}

  export default class ${componentName} extends ZTC {
    render(props) {
      console.log(props);
      return ${componentData.trim()}
    }
    mounted(){
      ${scriptData}
    }
  }`

  console.log(code);

  return code
}