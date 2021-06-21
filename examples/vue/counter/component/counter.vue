<template>
  <div ref="containerRef"></div>
</template>

<script>
import Counter from "@/examples/ztc/counter";
import { render, createElement } from "@/packages/runtime/src";
import { ref, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: Counter.name,
  emits: ["loaded"],
  setup(props, ctx) {
    const containerRef = ref();
    onMounted(() => {
      if (containerRef.value) {
        render(containerRef.value, createElement(Counter));
        ctx.emit("loaded");
      }
    });
    return { containerRef };
  },
});
</script>
