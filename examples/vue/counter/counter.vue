<template>
  <div ref="containerRef"></div>
</template>

<script>
import Counter from "@/examples/counter/component";
import { render, createElement } from "@/packages/runtime/src";
import { ref, defineComponent, onMounted } from "vue";
console.log("Counter vue:", createElement(Counter));
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
