// import Counter from "@/examples/vue/counter/index.vue";
// import Counter from "@/examples/counter/component/index.jsx";
// import BarChartVue from "@/examples/vue/bar-chart/index.vue";
import BarChartVue from "@/examples/bar-chart/component";
import { createApp } from "vue";

// const app = createApp(Counter);
const app = createApp(BarChartVue);

const container = document.createElement("div");
container.setAttribute("id", "demo");
container.style.width = "400px";
container.style.height = "400px";

document.body.appendChild(container);

app.mount("#demo");
