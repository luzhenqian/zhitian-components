const utils = require("./utils");
const getDefaultStylePath = utils.getDefaultStylePath;
const getDefaultDataPath = utils.getDefaultDataPath;

/**
 * codeGen
 * @param {string} imps import module string
 * @param {string} componentName
 * @param {string} componentData
 * @param {string} scriptData
 * @param {string} resourcePath
 *
 * @returns {string} define component class
 */
function codeGen(
  imps,
  componentName,
  componentData,
  scriptData,
  styleData,
  resourcePath
) {
  return `
  import { createElement, ZTC } from "@/packages/runtime/src"
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
      !this.props && (this.props = {});
      (this.props.style && typeof this.props.style === "object") ||
      (this.props.style = __ztDefaultStyle__)
      this.props.data || (this.props.data = __ztDefaultData__)
      const styleShell = document.createElement('style')
      styleShell.content = \`${styleData}\`
      // console.log(this.el.parent)
      // this.el.parentElement.appendChild(styleShell)
      ${scriptData}
    }
  }`;
}

module.exports = codeGen;
