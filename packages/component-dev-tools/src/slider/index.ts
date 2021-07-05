import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state,
} from "../../../../node_modules/lit/decorators";

@customElement("zt-slider")
export default class Decimal extends LitElement {
  static styles = css`
    .container {
      position: relative;
      height: 4px;
      margin: 6px;
    }
    .rail {
      position: absolute;
      background-color: #fff;
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }
    .track {
      position: absolute;
      background-color: var(--ztcdt-primary-color);
      height: 100%;
      border-radius: 2px;
    }
    .handle {
      position: absolute;
      border: 2px solid var(--ztcdt-primary-color);
      background-color: #fff;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      top: calc(-50% - 4px);
      z-index: 999;
    }
    .tip {
      background-color: var(--ztcdt-black);
      color: var(--ztcdt-hight-text-color);
      display: inline-block;
      position: absolute;
      top: calc(100% + 12px);
      left: -100%;
      padding: 4px 6px;
    }
    .tip:before {
      content: "";
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-bottom: 8px solid var(--ztcdt-black);
      border-top: none;
      display: inline-block;
      position: absolute;
      top: -8px;
      left: calc(50% - 8px);
    }
  `;

  @property({ type: Number }) width = 200;
  @property({ type: Number }) value = 30;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) min = 1;
  @state() _tipVisible = false;

  render() {
    return html`<div
      class="container"
      style="width: ${this.width}px;"
      @click=${this._changeValue}
    >
      <div class="rail"></div>
      <div class="track" style="width: ${this.value}%;"></div>
      <div
        @mousedown=${this.mousedownHandler}
        class="handle"
        style="left: ${Math.floor(this.value)}%;"
        @mouseenter=${() => (this._tipVisible = true)}
        @mouseleave=${() => (this._tipVisible = false)}
      >
        <div
          class="tip"
          style="display: ${this._tipVisible ? "inline-block" : "none"}"
        >
          ${this.value}
        </div>
      </div>
    </div>`;
  }

  private _changeValue(e: any) {
    let value = e.offsetX / (this.width / this.max);
    if (value > this.max) value = this.max;
    if (value < this.min) value = this.min;
    this.value = value;

    const detail = { value: value };
    const event = new CustomEvent("change", {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
  }

  mousedownHandler(e: DragEvent) {
    e.preventDefault();
    const moveHandler = (moveE: any) => {
      e.preventDefault();
      this._changeValue(moveE);
    };
    document.addEventListener("mousemove", moveHandler);
    const upHandler = () => {
      e.preventDefault();
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };
    document.addEventListener("mouseup", upHandler);
  }
}
