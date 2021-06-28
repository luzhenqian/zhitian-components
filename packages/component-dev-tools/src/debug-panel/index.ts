import { html, LitElement } from "lit";
// import { customElement, property, query } from "lit/decorators";
import {
  customElement,
  property,
  query,
} from "../../../../node_modules/lit/decorators";

@customElement("ztcdt-debug-panel")
export default class DebugPanel extends LitElement {
  @query("input", true) _input!: HTMLInputElement;

  render() {
    return html`<button @click=${this._getValue} />`;
  }
  private _getValue() {
    const value = this._input.value.trim();
    console.log(this._input, value);
  }
}
