import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("zt-loading")
export default class Loading extends LitElement {
  static styles = css`
    .loading {
      width: 100%;
      height: 100%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    svg path,
    svg rect {
      fill: var(--ztcdt-primary-color);
    }
  `;

  render() {
    return html` <div class="loading">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24px"
        height="30px"
        viewBox="0 0 24 30"
        style="enable-background:new 0 0 50 50;"
      >
        <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="0.2; 1; .2"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            attributeType="XML"
            values="10; 20; 10"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="10; 5; 10"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2">
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="0.2; 1; .2"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            attributeType="XML"
            values="10; 20; 10"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="10; 5; 10"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2">
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="0.2; 1; .2"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            attributeType="XML"
            values="10; 20; 10"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="10; 5; 10"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>`;
  }
}
