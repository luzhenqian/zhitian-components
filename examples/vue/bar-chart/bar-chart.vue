<template>
  <div ref="containerRef" style="width: 400px;height: 400px;"></div>
</template>

<script>
import BarChart from "@/examples/bar-chart/component";
import { render, createElement } from "@/packages/runtime/src";
import { ref, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: BarChart.name,
  emits: ["loaded"],
  setup(props, ctx) {
    const containerRef = ref();
    onMounted(() => {
      if (containerRef.value) {
        render(containerRef.value, createElement(BarChart));
        ctx.emit("loaded");
      }
    });
    return { containerRef };
  },
});
</script>
