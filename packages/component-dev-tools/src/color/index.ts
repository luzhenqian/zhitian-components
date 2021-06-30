import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  query,
} from "../../../../node_modules/lit/decorators";

@customElement("ztcdt-color")
export default class Color extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
      --width: calc(100% - 2 * 8px);
    }
    .zt-color-container {
      display: inline-block;
      width: 200px;
      padding: 8px;
      border-radius: 3px;
      background-color: #ffffff;
      position: relative;
    }
    .zt-color-area-wrap {
      background: rgb(0, 255, 150);
      width: 100%;
      height: 200px;
    }
    .zt-color-area {
      position: relative;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to right,
        rgb(255, 255, 255),
        rgba(255, 255, 255, 0)
      );
    }
    .zt-color-area-child {
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0));
    }
    .zt-point {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid #ffffff;
      cursor: pointer;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .zt-color-bar {
      position: absolute;
      height: 20px;
      width: var(--width);
      background: linear-gradient(
        to right,
        rgb(255, 0, 0) 0%,
        rgb(255, 255, 0) 17%,
        rgb(0, 255, 0) 33%,
        rgb(0, 255, 255) 50%,
        rgb(0, 0, 255) 67%,
        rgb(255, 0, 255) 83%,
        rgb(255, 0, 0) 100%
      );
    }
    .zt-color-slider {
      display: inline-block;
      height: 100%;
      width: 1rem;
      background: #ffffff;
    }
    .zt-color-input-wrap {
      display: flex;
      justify-content: space-between;
      width: 100%;
      color: var(--ztcdt-primary-color);
    }
    .zt-color-input-item {
      display: inline-flex;
      flex-direction: column;
      width: 18%;
      margin: auto;
    }
    .zt-color-input-item:first-child {
      width: 25%;
    }
    .zt-color-input-item > span {
      text-align: center;
    }

    .zt-colors {
      display: flex;
      flex-wrap: wrap;
    }
    .zt-colors-item {
      width: 16px;
      height: 16px;
      margin: 6px 10px;
    }
  `;

  @property() colors = ["", "", "", "", "", "", "", "", ""];

  render() {
    return html`<div class="zt-color-container">
      <div class="zt-color-area-wrap">
        <div class="zt-color-area">
          <div class="zt-color-area-child"></div>
          <span class="zt-point" draggable @drag=${this.drag}></span>
        </div>
      </div>

      <div>
        <div>
          <div class="zt-color-bar">
            <span class="zt-color-slider"></span>
          </div>
          <div class="zt-transparence-bar">
            <span class="zt-color-slider"></span>
          </div>
        </div>
        <div class="current-color"></div>
      </div>

      <div class="zt-color-input-wrap">
        <div class="zt-color-input-item"><input /><span>Hex</span></div>
        <div class="zt-color-input-item"><input /><span>R</span></div>
        <div class="zt-color-input-item"><input /><span>G</span></div>
        <div class="zt-color-input-item"><input /><span>B</span></div>
        <div class="zt-color-input-item"><input /><span>A</span></div>
      </div>

      <div class="zt-colors">
        <!-- FIXME: grammatical problem -->
        ${this.colors.map(
          (color: string) =>
            html`<span
              class="zt-colors-item"
              style="background-color: red;"
            />`
        )}
      </div>
    </div>`;
  }

  drag(e: MouseEvent) {
    console.log("drag:", e.clientX, e.clientY);
  }
}
