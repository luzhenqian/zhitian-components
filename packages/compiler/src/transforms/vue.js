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
  <div ref="containerRef"></div>
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
  setup(props, ctx) {
    const containerRef = ref();
    onMounted(() => {
      if (containerRef.value) {
        render(containerRef.value, createElement(${componentName}));
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
