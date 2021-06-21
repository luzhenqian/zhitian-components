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
  content,
  imps,
  componentName,
  componentData,
  scriptData,
  styleData,
  resourcePath
) {
  return `
<template>
  <div style="width: 100%; height: 100%" ref="containerRef"></div>
</template>

<script>
${imps}
import { ref, defineComponent, onMounted } from "vue";
import { render, createElement, ZTC } from "@/packages/runtime/src"
import defaultStyle from "${getDefaultStylePath(resourcePath)}"
import defaultData from "${getDefaultDataPath(resourcePath)}"
${content}

export default defineComponent({
  name: "${componentName}",
  emits: ["loaded"],
  props: {
    style: {
      type: Object,
      default() {
        return defaultStyle
      } 
    },
    data: {
      type: Object,
      default() {
        return defaultData
      }
    },
    interaction: Object
  },
  setup(props, ctx) {
    const containerRef = ref();
    onMounted(() => {
      console.log('props:', props, createElement(${componentName}, props))
      if (containerRef.value) {
        render(containerRef.value, createElement(${componentName}, props));
        ctx.emit("loaded");
      }
    });
    return { containerRef };
  },
});
</script>
`;
}

module.exports = codeGen;
