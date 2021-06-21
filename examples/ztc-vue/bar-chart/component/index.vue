<template>
  <div style="width: 400px; height: 400px">
    <bar-chart />
  </div>
</template>

<script>
import BarChart from "@/examples/ztc/bar-chart/component";
import { defineComponent } from "vue";

export default defineComponent({
  components: { [BarChart.name]: BarChart },
  name: "BarChartPreviwe",
  setup() {
    console.log(BarChart.props);
    return {};
  },
});
</script>
