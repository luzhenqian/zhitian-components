const cheerio = require('cheerio');
const path = require('path');

module.exports = function (source) {
  const $ = cheerio.load(source)

  let [scriptData, imps] = peelOffImps($('script').contents()[0].data)

  const component = $('component')[0]
  const componentName = component.attribs.name

  const styleData = $('style').html()

  const rawComponentData = $(component).html()
  console.log('s:', styleData);

  const componentData = insertProps(rawComponentData)

  const code = generateCode(imps, componentName, componentData, scriptData, styleData, this.resourcePath)

  return code
}

/**
 * generateCode
 * @param {string} imps import module string
 * @param {string} componentName 
 * @param {string} componentData 
 * @param {string} scriptData 
 * @param {string} resourcePath 
 * 
 * @returns {string} define component class
 */
function generateCode(imps, componentName, componentData, scriptData, styleData, resourcePath) {
  return `
  import { createElement, ZTC } from "@/core"
  import defaultStyle from "${getDefaultStylePath(resourcePath)}"
  import defaultData from "${getDefaultDataPath(resourcePath)}"
  ${imps}

  const __ztDefaultData__ = defaultData
  const __ztDefaultStyle__ = defaultStyle

  export default class ${componentName} extends ZTC {
    render(props) {
      return ${componentData.trim()}
    }
    beforeMount(props) {
      props === null && (props = {});
      (props.style && typeof props.style === "object") || (props.style = __ztDefaultStyle__)
      props.data || (props.data = __ztDefaultData__)
      const styleShell = document.createElement('style')
      styleShell.content = \`${styleData}\`
      // console.log(this.el.parent)
      // this.el.parentElement.appendChild(styleShell)
      ${scriptData}
    }
  }`
}

/**
 * peelOffImps 
 * @param {string} scriptData 
 * @returns {[string, string]} scriptData imps
 */
function peelOffImps(scriptData) {
  const pattern = new RegExp(/import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*;$/, 'mg')
  const impsArr = scriptData.match(pattern)
  let imps = ''
  impsArr.forEach(imp => {
    scriptData = scriptData.replace(imp, '')
    imps += imp + `\n`
  });
  return [scriptData, imps]
}

/**
 * insertProps
 * @param {string} html component render return
 * @returns add {...props} to root element
 */
function insertProps(html) {
  const idx = html.indexOf('>')
  if (idx === -1) return html
  return html.slice(0, idx) + ' style="width: 100%; height: 100%;" {...props} ' + html.slice(idx);
}

function getPath(resourcePath) {
  return resourcePath.replace(path.basename(resourcePath), "")
}

function getDefaultDataPath(resourcePath) {
  return getPath(resourcePath) + "data.default.json"
}

function getDefaultStylePath(resourcePath) {
  return getPath(resourcePath) + "style.default.json"
}
