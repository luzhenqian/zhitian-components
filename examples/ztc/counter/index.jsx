import { render, createElement } from "@/packages/runtime/src/index";
import Counter from "./component";

render(
  document.getElementById("app"),
  <div style="width:400px; height: 400px">
    <Counter />
  </div>
);
