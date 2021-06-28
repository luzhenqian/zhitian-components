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
    return html`<div @change="${this._change}"></div>
      <slot></slot>`;
  }

  private _change(e: CustomEvent) {
    console.log("e:", e);
  }
}
