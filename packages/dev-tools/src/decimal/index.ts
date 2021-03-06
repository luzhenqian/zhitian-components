import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { inputStyles } from "../styles/input";

export interface DecimalProps {
  value?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  fixed?: number;
  customStyle?: string;
}

@customElement("zt-decimal")
export default class Decimal<DecimalProps> extends LitElement {
  static styles = css`
    ${inputStyles}
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 999999999;
  @property({ type: String }) placeholder = "";
  @property({ type: Number }) fixed = 5;
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
    // TODO: fixed not work
    const reg = new RegExp(`[^\\d+\\.?\\d{0, ${this.fixed}}]`, "g");
    // const reg = /[^\d+\.?\d*]/g;
    console.log("reg:", reg);

    let value = (e?.target?.value as string).replace(reg, "");
    const tmpl = value.split(".");
    if (tmpl.length > 2) {
      value = tmpl[0] + "." + tmpl[1];
    }
    if (Number(value) < this.min) value = "" + this.min;
    if (Number(value) > this.max) {
      if (this.inputRef.value) {
        this.inputRef.value.value = String(Math.floor(Number(value) / 10));
      }
      return;
    }
    if (this.inputRef.value) {
      this.inputRef.value.value = "" + value;
    }
  }
}

// special single character
var isNumber = /\d/;
var isNotNumber = /\D/;
var isAlphanumericUnderscore = /\w/;
var isNotAlphanumericUnderscore = /\W/;
var isWhitespace = /\s/;
var isNotWhitespace = /\S/;

// white space
var isEnter = /\r/;
var isWrap = /\n/;
var isPageChange = /\t/;
var isTab = /\v/;
var isAnyWhitespace = /\s/;

// quantifier
var zoreToMany = /\d*/;
var onceMore = /\d+/;
var zoreToOne = /\d?/;
var fixed = /\d{10}/;
var min = /\d{10,}/;
var range = /\d{10,20}/;

// range
var pipe = /ab|cd/; // ??????????????????
var manySelectOne = /[abcde]/; // ?????????
var manySelectOneRange = /[a-z]]/; // ??????????????????
var manyNotContainerOneRange = /[^a-z]]/; // ?????????????????????????????????
