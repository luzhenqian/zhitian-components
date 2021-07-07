import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state,
} from "lit/decorators.js";

interface RadioItem {
  value: string;
  label: string;
}

@customElement("zt-radio")
export default class Radio extends LitElement {
  static styles = css`
    .zt-radio-group {
      display: flex;
      flex-wrap: wrap;
      outline: none;
    }
    .zt-radio-item {
      position: relative;
      padding-left: 24px;
      margin-right: 12px;
      cursor: pointer;
    }
    .zt-radio-item::before {
      position: absolute;
      left: 0;
      bottom: 0;
      content: " ";
      border-radius: 50%;
      display: inline-flex;
      width: 16px;
      height: 16px;
      border: 1px solid var(--ztcdt-primary-color);
    }
    .checked.zt-radio-item::after {
      position: absolute;
      left: 4.5px;
      top: 8px;
      content: " ";
      border-radius: 50%;
      display: inline-flex;
      width: 8px;
      height: 8px;
      background-color: var(--ztcdt-primary-color);
    }
  `;

  @property({ type: Array }) radio: RadioItem[] = [];
  @state() checkedItem: RadioItem | null = null;

  render() {
    return html`<div tabindex="0" class="zt-radio-group">
      ${this.radio.map(
        (item) =>
          html`<div
            class="zt-radio-item ${item === this.checkedItem ? "checked" : ""}"
            @click=${() => this.clickHandler(item)}
          >
            ${item.label}
          </div>`
      )}
    </div>`;
  }

  clickHandler(item: RadioItem) {
    this.checkedItem = item;
  }
}
