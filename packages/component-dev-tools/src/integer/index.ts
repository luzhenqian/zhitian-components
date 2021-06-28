import { html, LitElement } from "lit";
import { customElement, property } from "../../../../node_modules/lit/decorators";

@customElement("ztcdt-integer")
export default class Integer extends LitElement {
  @property() value = "";

  render() {
    return html`<input @click=${this._changeValue} />`;
  }
  private _changeValue(e: CustomEvent) {
    this.value = e.detail.value;
  }
}
