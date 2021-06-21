import { render, createElement } from "@/packages/runtime/src/index";
import BarChart from "./component";

render(
  document.getElementById("app"),
  <div style="width:400px; height: 400px">
    <BarChart />
  </div>
);
