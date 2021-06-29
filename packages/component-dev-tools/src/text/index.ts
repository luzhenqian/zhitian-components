import { css, html, LitElement } from "lit";
import { customElement, property } from "../../node_modules/lit/decorators";
import { createRef, Ref, ref } from "../../node_modules/lit/directives/ref";
import { inputStyles } from "../styles/input";

@customElement("ztcdt-text")
export default class Text extends LitElement {
  static styles = css`
    ${inputStyles}
  `;

  @property({ type: Number }) value = "";
  @property({ type: Number }) disabled = false;
  @property({ type: Number }) maxlength = 5;

  inputRef: Ref<HTMLInputElement> = createRef();

  render() {
    return html`<input
      ${ref(this.inputRef)}
      ${this.disabled ? "disabled" : ""}
      value=${this.value}
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
