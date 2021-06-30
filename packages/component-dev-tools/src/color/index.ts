import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  query,
  state,
} from "../../../../node_modules/lit/decorators";
import { styleMap } from "../../../../node_modules/lit/directives/style-map";
import { inputStyles } from "../styles/input";

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
      background-color: var(--ztcdt-disable-text-color);
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
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid #ffffff;
      cursor: pointer;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .zt-color-bar,
    .zt-transparence-bar {
      margin: 2px;
      position: relative;
      height: 8px;
      width: 100%;
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
      position: absolute;
      display: inline-block;
      height: 100%;
      width: 1rem;
      background: #ffffff;
    }
    .zt-color-input-wrap {
      display: flex;
      justify-content: space-between;
      width: 100%;
      color: var(--ztcdt-height-text-color);
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
      margin: 6px 10.4px;
      cursor: pointer;
    }
  `;

  @property() colors = [
    "rgb(238, 235, 255)",
    "rgb(218, 213, 243)",
    "rgb(199, 192, 230)",
    "rgb(181, 172, 218)",
    "rgb(164, 154, 205)",
    "rgb(135, 122, 180)",
  ];
  @state() currentColor = "";

  render() {
    return html`<div class="zt-color-container">
      <div class="zt-color-area-wrap">
        <div class="zt-color-area">
          <div class="zt-color-area-child"></div>
          <span class="zt-point" draggable></span>
        </div>
      </div>

      <div>
        <div>
          <div style="position: relative; height: 10px; overflow: hidden;">
            <div
              style="position: absolute; inset: 0px; background: linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%);"
            >
              <div style="margin: 0px 2px; position: relative; height: 100%;">
                <div style="position: absolute; left: 7.73196%;">
                  <div
                    style="margin-top: 1px; width: 4px; border-radius: 1px; height: 8px; box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 2px; background: rgb(255, 255, 255); transform: translateX(-2px);"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            style="position: relative; height: 10px; margin-top: 4px; overflow: hidden;"
          >
            <div style="position: absolute; inset: 0px;">
              <div style="position: absolute; inset: 0px; overflow: hidden;">
                <div
                  style='position: absolute; inset: 0px; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center;'
                ></div>
              </div>
              <div
                style="position: absolute; inset: 0px; background: linear-gradient(to right, rgba(144, 19, 254, 0) 0%, rgb(144, 19, 254) 100%);"
              ></div>
              <div style="position: relative; height: 100%; margin: 0px 3px;">
                <div style="position: absolute; left: 100%;">
                  <div
                    style="width: 4px; border-radius: 1px; height: 8px; box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 2px; background: rgb(255, 255, 255); margin-top: 1px; transform: translateX(-2px);"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="zt-transparence-bar">
            <span class="zt-color-slider"></span>
          </div> -->
        </div>
        <div class="current-color"></div>
      </div>

      <div class="zt-color-input-wrap">
        <div class="zt-color-input-item">
          <input />
          <span>Hex</span>
        </div>
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
              @click=${() => this.selectColor(color)}
              class="zt-colors-item"
              style="background-color: ${color};
              box-shadow: ${color === this.currentColor
                ? color
                : "rgba(0,0,0,0)"} 0 0 0 1px;"
            />`
        )}
      </div>
    </div>`;
  }

  selectColor(color: string) {
    this.currentColor = color;
  }
}
