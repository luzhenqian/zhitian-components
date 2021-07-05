import { css, html, LitElement } from "lit";
import { customElement, property } from "../../../../node_modules/lit/decorators";
import { createRef, Ref, ref } from "../../../../node_modules/lit/directives/ref";
import { inputStyles } from "../styles/input";

@customElement("zt-decimal")
export default class Decimal extends LitElement {
  static styles = css`
    ${inputStyles}
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 999999999;
  @property({ type: String }) placeholder = "";
  @property({ type: Number }) fixed = 5;

  inputRef: Ref<HTMLInputElement> = createRef();

  render() {
    return html`<input
      ${ref(this.inputRef)}
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
var pipe = /ab|cd/; // 满足任意一个
var manySelectOne = /[abcde]/; // 多选一
var manySelectOneRange = /[a-z]]/; // 多选一，范围
var manyNotContainerOneRange = /[^a-z]]/; // 不可包含任意一个，范围
