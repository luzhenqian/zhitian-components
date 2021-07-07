import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
} from "lit/decorators.js";

@customElement("zt-modal")
export default class Modal extends LitElement {
  static styles = css`
    .modal {
      --radius: 6px;
      position: fixed;
      inset: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      position: absolute;
      max-width: 80%;
      max-height: 80%;
    }
    .content {
      cursor: pointer;
      margin: auto;
      border-bottom-left-radius: var(--radius);
      border-bottom-right-radius: var(--radius);
      padding: 8px 12px;
      background: #fff;
      box-sizing: content-box;
      display: inline-block;
    }
    ::slotted(*) {
      height: 100%;
      width: 100%;
    }
    .header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      padding: 8px 12px;
      box-sizing: border-box;
      position: relative;
      border-top-left-radius: var(--radius);
      border-top-right-radius: var(--radius);
    }
    .header::before {
      content: " ";
      position: absolute;
      height: 1px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background-color: rgba(0, 0, 0, 0.24);
    }
    .title {
      color: var(--ztcdt-disable-text-color);
    }
    .icon {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
    .zen {
      border-radius: 0;
    }
  `;

  @property() title = "";
  @property({ type: Boolean }) zen = false; // TODO

  render() {
    return html`<div class="modal" @click="${this.closeHandler}">
      <div class="modal-content">
        ${!this.zen
          ? html`<div class="header">
              <span class="title">${this.title}</span>
              <span @click=${this.close}>${close}</span>
            </div>`
          : null}
        <span class="content ${this.zen ? "zen" : ""}">
          <slot></slot>
        </span>
      </div>
    </div>`;
  }

  closeHandler(e: Event) {
    if (e.target === this.shadowRoot?.firstElementChild) {
      e.stopPropagation();
      this.close();
    }
  }
  close() {
    this.remove();
  }
}

const close = html`<svg
  t="1625126277529"
  class="icon"
  viewBox="0 0 1024 1024"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  p-id="4055"
>
  <path
    d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z"
    p-id="4056"
  ></path>
</svg>`;
