import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { inputStyles } from "../styles/input";

export interface IntegerProps {
  value?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  styles?: string;
  customStyle?: string;
}

@customElement("zt-integer")
export default class Integer<IntegerProps> extends LitElement {
  static styles = css`
    ${inputStyles}
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 999999999;
  @property({ type: String }) placeholder = "";
  @property({ type: String }) styles = "";
  @property({ type: String }) customStyle = "";

  inputRef: Ref<HTMLInputElement> = createRef();

  render() {
    return html`<input
      ${ref(this.inputRef)}
      style=${this.customStyle}
      value=${this.value}
      placeholder=${this.placeholder}
      @input=${this._input}
    />`;
  }

  private _input(e: any) {
    let value = Number(e?.target?.value.replace(/[^\d*]/g, ""));
    if (value < this.min) value = this.min;
    if (value > this.max) {
      if (this.inputRef.value) {
        this.inputRef.value.value = String(Math.floor(value / 10));
      }
      return;
    }
    if (this.inputRef.value) {
      this.inputRef.value.value = "" + value;
    }

    const detail = { value: value };
    const event = new CustomEvent("change", {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
  }
}
