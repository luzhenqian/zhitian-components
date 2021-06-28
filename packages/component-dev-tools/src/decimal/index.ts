import { css, html, LitElement } from "lit";
import { customElement, property } from "../../node_modules/lit/decorators";
import { createRef, Ref, ref } from "../../node_modules/lit/directives/ref";
import { inputStyles } from "../styles/input";

@customElement("ztcdt-decimal")
export default class Decimal extends LitElement {
  static styles = css`
    ${inputStyles}
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 999999999;

  inputRef: Ref<HTMLInputElement> = createRef();

  render() {
    return html`<input
      ${ref(this.inputRef)}
      value=${this.value}
      @input=${this._input}
    />`;
  }
  private _input(e: any) {
    let value = Number(e?.target?.value.replace(/^[\d+?]\.[\d+?]+/g, ""));

    if (value < this.min) value = this.min;
    if (value > this.max) value = this.max;
    if (this.inputRef.value) {
      this.inputRef.value.value = "" + value;
    }
  }
}
