const utils = require("./utils");
const getDefaultStylePath = utils.getDefaultStylePath;
const getDefaultDataPath = utils.getDefaultDataPath;
const getDefaultInteractionPath = utils.getDefaultInteractionPath;
const getStyleConfigPath = utils.getStyleConfigPath;
const getDataConfigPath = utils.getDataConfigPath;
const getInteractionConfigPath = utils.getInteractionConfigPath;

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
  const script = analysisScript(scriptData);
  if (typeof script === "string") {
    return statelessCodeGen(
      imps,
      componentName,
      componentData,
      script,
      styleData,
      resourcePath
    );
  } else if (typeof script === "object") {
    return stateCodeGen(
      imps,
      componentName,
      componentData,
      script,
      styleData,
      resourcePath
    );
  }
}

function statelessCodeGen(
  imps,
  componentName,
  componentData,
  scriptData,
  styleData,
  resourcePath
) {
  return `
  import { createElement, ZTC } from "@ztc/runtime"
  import defaultStyle from "${getDefaultStylePath(resourcePath)}"
  import defaultData from "${getDefaultDataPath(resourcePath)}"
  import defaultInteraction from "${getDefaultInteractionPath(resourcePath)}"
  import styleConfig from "${getStyleConfigPath(resourcePath)}"
  import dataConfig from "${getDataConfigPath(resourcePath)}"
  import interactionConfig from "${getInteractionConfigPath(resourcePath)}"
  ${imps}

  const __ztDefaultData__ = defaultData
  const __ztDefaultStyle__ = defaultStyle

  export default class ${componentName} extends ZTC {
    static styleConfig = styleConfig
    static dataConfig = dataConfig
    static interactionConfig = interactionConfig

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

function stateCodeGen(
  imps,
  componentName,
  componentData,
  scriptData,
  styleData,
  resourcePath
) {
  return `
  import { createElement, ZTC } from "@ztc/runtime"
  import defaultStyle from "${getDefaultStylePath(resourcePath)}"
  import defaultData from "${getDefaultDataPath(resourcePath)}"
  import defaultInteraction from "${getDefaultInteractionPath(resourcePath)}"
  import styleConfig from "${getStyleConfigPath(resourcePath)}"
  import dataConfig from "${getDataConfigPath(resourcePath)}"
  import interactionConfig from "${getInteractionConfigPath(resourcePath)}"
  ${imps}

  const __ztDefaultData__ = defaultData
  const __ztDefaultStyle__ = defaultStyle

  export default class ${componentName} extends ZTC {
    static styleConfig = styleConfig
    static dataConfig = dataConfig
    static interactionConfig = interactionConfig

    ${scriptData.state}

    methods = {
      ${scriptData.methods}
    }

    render(props) {
      return ${componentData.trim()}
    }

    ${scriptData.run}
    beforeMount(props) {
      !this.props && (this.props = {});
      (this.props.style && typeof this.props.style === "object") ||
      (this.props.style = __ztDefaultStyle__)
      this.props.data || (this.props.data = __ztDefaultData__)
      this.run && this.run()
    }

    _styleMount() {
      const styleShell = document.createElement('style')
      styleShell.textContent = \`${styleData}\`
      if(this.el.parentElement) {
        this.el.parentElement.appendChild(styleShell)
        this._styleMounted = true
      }
    }
  }`;
}

function analysisScript(scriptData) {
  const isConfig = /export default/g.test(scriptData);
  if (isConfig) {
    scriptData = scriptData.replace("export default", "");
    let config;
    eval(`config = ${scriptData}`);
    const run = config.run + "";
    let state = "";
    for (let key in config.state) {
      let value = config.state[key];
      if(typeof value === "string"){
        value = `"${value}"`
      }
      state += `${key} = ${value};\n`;
    }
    let methods = "";
    for (let key in config.methods) {
      methods += `${config.methods[key]} ,\n`;
    }
    return { methods, run, state };
  }
  console.log('data:',scriptData);
  return scriptData;
}

module.exports = codeGen;
