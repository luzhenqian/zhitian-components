import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state,
} from "../../../../node_modules/lit/decorators";

interface CheckItem {
  value: string;
  label: string;
}

@customElement("zt-checkbox")
export default class Radio extends LitElement {
  static styles = css`
    .zt-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      outline: none;
    }
    .zt-checkbox-item {
      position: relative;
      padding-left: 24px;
      margin-right: 12px;
      cursor: pointer;
    }
    .zt-checkbox-item::before {
      position: absolute;
      left: 0;
      bottom: 0;
      content: " ";
      display: inline-flex;
      width: 16px;
      height: 16px;
      border: 1px solid var(--ztcdt-primary-color);
    }
    .checked.zt-checkbox-item::after {
      position: absolute;
      left: 4.5px;
      top: 8px;
      content: " ";
      display: inline-flex;
      width: 8px;
      height: 8px;
      background-color: var(--ztcdt-primary-color);
    }
  `;

  @property({ type: Array }) checkOption: CheckItem[] = [];
  @property({ type: Array }) defaultCheckedList: any[] = [];
  @state() checkedList: CheckItem[] = [];

  render() {
    return html`<div tabindex="0" class="zt-checkbox-group">
      ${this.checkOption.map(
        (item) =>
          html`<div
            class="zt-checkbox-item ${this.checkedList.includes(item)
              ? "checked"
              : ""}"
            @click=${() => this.clickHandler(item)}
          >
            ${item.label}
          </div>`
      )}
    </div>`;
  }

  clickHandler(item: CheckItem) {
    const idx = this.checkedList.findIndex((i) => i === item);
    if (idx > -1) {
      this.checkedList.splice(idx, 1);
      this.checkedList = [...this.checkedList];
      return;
    }
    this.checkedList = [...this.checkedList, item];
  }
}
