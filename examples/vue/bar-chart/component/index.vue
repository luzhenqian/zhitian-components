<template>
  <div ref="containerRef" style="width: 400px; height: 400px"></div>
</template>

<script>
import BarChart from "@/examples/ztc/bar-chart/component";
import { render, createElement } from "@/packages/runtime/src";
import { ref, defineComponent, onMounted } from "vue";
import defaultData from "./data.default.json";
import defaultStyle from "./style.default.json";

export default defineComponent({
  name: BarChart.name,
  emits: ["loaded"],
  setup(props, ctx) {
    const containerRef = ref();
    onMounted(() => {
      if (containerRef.value) {
        console.log(
          "containerRef.value",
          containerRef.value,
          createElement(BarChart, { data: defaultData, style: defaultStyle })
        );
        render(
          containerRef.value,
          createElement(BarChart, { data: defaultData, style: defaultStyle })
        );
        ctx.emit("loaded");
      }
    });
    return { containerRef };
  },
});
</script>
