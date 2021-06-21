<template>
  <div ref="containerRef"></div>
</template>

<script>
import Counter from "@/examples/counter/component";
import { render, createElement } from "@/packages/runtime/src";
import { ref, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: Counter.name,
  setup() {
    const containerRef = ref();
    onMounted(() => {
      if (containerRef.value) {
        render(containerRef.value, createElement(Counter));
      }
    });
    return { containerRef };
  },
});
</script>
