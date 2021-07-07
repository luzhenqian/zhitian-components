import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { textAreaStyles } from "../styles/input";

@customElement("zt-text-area")
export default class TextArea extends LitElement {
  static styles = css`
    ${textAreaStyles}
  `;

  @property({ type: Number }) value = "";
  @property({ type: Number }) disabled = false;
  @property({ type: Number }) maxlength = 999999999;
  @property({ type: String }) placeholder = "";
  @property({ type: Number }) rows = 3;
  @property({ type: Number }) cols = 22;

  inputRef: Ref<HTMLInputElement> = createRef();

  render() {
    return html`<textarea
      ${ref(this.inputRef)}
      ${this.disabled ? "disabled" : ""}
      value=${this.value}
      placeholder=${this.placeholder}
      rows=${this.rows}
      cols=${this.cols}
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
