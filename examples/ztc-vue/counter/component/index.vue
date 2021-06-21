<template>
  <div style="width: 400px; height: 400px">
    <counter />
  </div>
</template>

<script>
import Counter from "@/examples/ztc/counter/component";
import { defineComponent } from "vue";

export default defineComponent({
  components: { [Counter.name]: Counter },
  name: "CounterPreviwe",
  setup() {
    return {};
  },
});
</script>
