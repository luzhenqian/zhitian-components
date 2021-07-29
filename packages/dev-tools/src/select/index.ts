import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { iconStyles } from "../styles/input";

interface Option {
  key: string;
  value: string;
}

export interface SelectProps {
  placeholder?: string;
  options?: Option[];
}

@customElement("zt-select")
export default class Select<SelectProps> extends LitElement {
  static styles = css`
    ${iconStyles}
    .zt-select-wrap {
      padding: 4px 6px;
      margin: 10px;
      outline: none;
      color: var(--ztcdt-middle-text-color);
      background: transparent;
      border-radius: var(--ztcdt-radius);
      border: 2px solid var(--ztcdt-middle-text-color);
      cursor: pointer;
      width: 200px;
      height: 1rem;
      min-height: 1rem;
      line-height: 1rem;
      position: relative;
      display: inline-flex;
      justify-content: space-between;
    }
    .zt-select-wrap:hover,
    .zt-select-wrap:focus {
      border: 2px solid var(--ztcdt-primary-color);
    }

    .zt-option-wrap {
      width: 100%;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      box-sizing: border-box;
      border: 2px solid var(--ztcdt-primary-color);
      border-radius: var(--ztcdt-radius);
      z-index: 1000;
      background-color: #121212;
    }

    .zt-option-item {
      width: 100%;
      height: 1rem;
      min-height: calc(1rem + 8px);
      line-height: calc(1rem + 8px);
      padding: 2px 8px;
      margin: 8px 0px;
      box-sizing: border-box;
    }

    .zt-option-item:hover {
      background: var(--ztcdt-primary-color);
      color: var(--ztcdt-hight-text-color);
    }

    .arrow-down {
      position: absolute;
      right: 2px;
    }
  `;

  @property({ type: String }) placeholder = "";
  @property({ type: Array }) options: Option[] = [];
  @state() open = false;
  @state() selectOption: null | Option = null;

  inputRef: Ref<HTMLInputElement> = createRef();

  render() {
    return html`<div
      tabindex="0"
      class="zt-select-wrap"
      ${ref(this.inputRef)}
      @click=${this._clickHandler}
    >
      ${!this.open
        ? html`<span
            >${!this.selectOption ? "未选择" : this?.selectOption?.value}</span
          >`
        : html`<div class="zt-option-wrap">
            ${this.options.length > 0
              ? this.options.map(
                  (option) =>
                    html`<div
                      class="zt-option-item"
                      key=${option?.value}
                      @click=${(e: Event) =>
                        this._optionClickHandler(e, option)}
                    >
                      ${option?.value}
                    </div>`
                )
              : html`<div class="zt-option-item">无数据</div>`}
          </div>`}
      <span class="arrow-down">${arrowDown}</span>
    </div>`;
  }

  private _clickHandler(e: Event) {
    this.open = !this.open;
  }

  private _optionClickHandler(e: Event, option: any) {
    try {
      this.selectOption = option;
    } finally {
      const detail = { value: this.selectOption?.key };
      const event = new CustomEvent("change", {
        detail,
        bubbles: true,
        composed: true,
        cancelable: true,
      });
      this.dispatchEvent(event);
    }
  }
}

const arrowDown = html`<svg
  t="1624937786428"
  class="icon"
  viewBox="0 0 1024 1024"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  p-id="3875"
>
  <path
    d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z"
    p-id="3876"
  ></path>
</svg>`;
