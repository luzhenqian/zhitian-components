import { css, html, LitElement } from "lit";
import {
  customElement,
  property
} from "../../../../node_modules/lit/decorators";
import {
  createRef,
  Ref,
  ref,
} from "../../../../node_modules/lit/directives/ref";

@customElement("ztcdt-integer")
export default class Integer extends LitElement {
  static styles = css`
    :host input {
      padding: 4px 6px;
      margin: 10px;
      outline: none;
      color: var(--ztcdt-middle-text-color);
      background: transparent;
      border-radius: var(--ztcdt-radius);
      border: 2px solid var(--ztcdt-middle-text-color);
    }
    input:hover,
    input:focus {
      border: 2px solid var(--ztcdt-primary-color);
    }
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
    let value = Number(e?.target?.value.replace(/[^0-9]/g, ""));
    if (value < this.min) value = this.min;
    if (value > this.max) value = this.max;
    if (this.inputRef.value) {
      this.inputRef.value.value = "" + value;
    }
    
    const detail = {value: value};
    const event = new CustomEvent('change', {detail, bubbles: true, composed: true, cancelable: true});
    this.dispatchEvent(event);
  }
}
