<template>
  <div>
    <bar-chart />
    <bar-chart />
  </div>
</template>

<script>
import BarChart from "./bar-chart.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "test",
  components: { "bar-chart": BarChart },
});
</script>
