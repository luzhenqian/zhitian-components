import { html, LitElement } from "lit";
// import { customElement, property, query } from "lit/decorators";
import {
  customElement,
  property,
  query,
} from "../../../../node_modules/lit/decorators";

@customElement("zt-debug-panel")
export default class DebugPanel extends LitElement {
  @query("input", true) _input!: HTMLInputElement;

  render() {
    console.log("render");

    return html`<div @change="${this._change}">
      <slot></slot>
    </div> `;
  }

  firstUpdated() {
    console.log("first updated");
    
    console.dir(this.children[0].constructor);
  }

  private _change(e: CustomEvent) {
    console.log("e:", e);
  }
}
