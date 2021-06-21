import BarChartVue from "@/examples/ztc-vue/bar-chart/index.vue";
import { createApp } from "vue";

const app = createApp(BarChartVue);

const container = document.createElement("div");
container.setAttribute("id", "demo");
container.style.width = "400px";
container.style.height = "400px";

document.body.appendChild(container);

app.mount("#demo");
