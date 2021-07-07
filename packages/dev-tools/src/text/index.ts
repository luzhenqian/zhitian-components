import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { inputStyles } from "../styles/input";

@customElement("zt-text")
export default class Text extends LitElement {
  static styles = css`
    ${inputStyles}
  `;

  @property({ type: String }) value = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Number }) maxlength = 999999999;
  @property({ type: String }) placeholder = "";

  inputRef: Ref<HTMLInputElement> = createRef();

  render() {
    return html`<input
      ${ref(this.inputRef)}
      ${this.disabled ? "disabled" : ""}
      value=${this.value}
      placeholder=${this.placeholder}
      @input=${this._input}
    />`;
  }

  private _input(e: any) {
    let value = e?.target?.value;
    if (value.length >= this.maxlength) {
      if (this.inputRef.value) {
        this.inputRef.value.value = String(value.substring(0, this.maxlength));
      }
    }
  }
}
