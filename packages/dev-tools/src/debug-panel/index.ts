import { html, css, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { FieldType } from "../form-renderer";
import { icon as publishIcon } from "./publish-icon";

enum PanelType {
  Styles = "Styles",
  Data = "Data",
  Interaction = "Interaction",
}

@customElement("zt-debug-panel")
export default class DebugPanel extends LitElement {
  static styles = css`
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      --title-bg-color: rgb(47, 46, 49);
      --title-text-color: rgb(224, 224, 226);
      --sub-title-bg-color: rgb(28, 28, 30);
    }
    .slot-container {
      width: 75%;
      background: var(--ztcdt-hight-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .panel {
      width: 25%;
      padding: 12px 24px;
    }
    .panel-tabs {
      display: flex;
      justify-content: space-around;
    }
    .panel-tab {
      padding: 8px 12px;
      position: relative;
      cursor: pointer;
    }
    .panel-tab.active::after {
      content: "";
      position: absolute;
      height: 2px;
      width: 100%;
      background-color: var(--ztcdt-primary-color);
      bottom: 0;
      left: 0;
    }
    .panel-content {
      padding-top: 12px;
    }
    .title-wrap {
      display: flex;
      justify-content: space-between;
      background-color: var(--title-bg-color);
      padding: 4px 8px;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      color: var(--title-text-color);
    }
    /* .title-wrap:first-child {
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }
    .sub-title-wrap:last-child {
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
    } */
    .sub-title-wrap {
      padding: 4px 8px;
      background-color: var(--sub-title-bg-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    .sub-title {
      font-size: 16px;
      font-weight: 500;
    }
    .sub-title-wrap::after {
      content: "";
      height: 1px;
      background-color: var(--title-bg-color);
      transform: scaleY(0.5);
      transform-origin: 50% 100%;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .icon {
      width: 40px;
      height: 40px;
      position: fixed;
      right: 2rem;
      bottom: 2rem;
      background: var(--ztcdt-dark-primary-color);
      border-radius: 50%;
      padding: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .icon > svg {
      fill: var(--ztcdt-primary-color);
    }
  `;

  @state() _component: any = null;
  @state() _stylesConfig: any = [];
  @state() _styles: any = {};
  @state() _currentPanelType: PanelType = PanelType.Styles;

  render() {
    return html`<div class="container"">
      <span class="slot-container">
        <slot></slot>
      </span>
      <i class="icon">${publishIcon}</i>
      <div class="panel">
        <div class="panel-tabs">
          <div class="panel-tab ${
            this._currentPanelType === PanelType.Styles ? "active" : ""
          }"
          @click="${this._changeTab.bind(this, PanelType.Styles)}"
          >
            样式
          </div>
          <div class="panel-tab ${
            this._currentPanelType === PanelType.Data ? "active" : ""
          }"
          @click="${this._changeTab.bind(this, PanelType.Data)}">
            数据
          </div>
          <div class="panel-tab ${
            this._currentPanelType === PanelType.Interaction ? "active" : ""
          }"
          @click="${this._changeTab.bind(this, PanelType.Interaction)}">
            交互
          </div>
        </div>
        <div class="panel-content">
          ${
            this._currentPanelType === PanelType.Styles
              ? renderForm(
                  this._stylesConfig,
                  this._styles,
                  this._changeStyles.bind(this)
                )
              : null
          }
        </div>
      </div>
    </div> `;
  }

  firstUpdated() {
    this._component = this.querySelector("#component");
    this._stylesConfig = (this._component.constructor as any).stylesConfig;
    this._styles = (this._component as any).styles;
  }

  updated() {
    this._styles = (this._component as any)?.styles;
  }

  private _changeStyles(styles: any) {
    this._styles = JSON.parse(JSON.stringify(styles));
    this._component.styles = this._styles;
  }

  private _changeTab(type: PanelType) {
    this._currentPanelType = type;
  }
}

function renderForm(
  stylesConfig: {
    code: string;
    name: string;
    show?: boolean;
    fieldset: {
      code: string;
      name: string;
      type: FieldType | FieldType[];
      options: any;
    }[];
  }[],
  stylesDefault: any,
  changeStyles: any
) {
  const changeHandler = (e: CustomEvent, code: any) => {
    const hasIdx = (
      e.detail.value as { value: string; label: string }[]
    ).findIndex((item) => item.value === "show");
    if (hasIdx !== -1) {
      stylesDefault[code].show = true;
      changeStyles(stylesDefault);
      return;
    }
    stylesDefault[code].show = false;
    changeStyles(stylesDefault);
  };

  return (stylesConfig || []).map(
    ({ code, name, fieldset, show }, idx) => html`<div>
      <div class="title-wrap">
        <span class="title">${name}</span>${show !== undefined
          ? html`<zt-checkbox
              @change=${(e: CustomEvent) => changeHandler.call(null, e, code)}
              checkOption="${JSON.stringify([
                { value: "show", label: "是否显示" },
              ])}"
              defaultCheckedList="${JSON.stringify([
                { value: "show", label: "是否显示" },
              ])}"
            ></zt-checkbox>`
          : html`<span></span>`}
      </div>
      ${fieldset.map(
        ({ name, type, options, code: fieldCode }) =>
          html`<div class="sub-title-wrap">
            <span class="sub-title">${name}</span>${FieldType.getComponent(
              type,
              options,
              stylesDefault,
              code,
              fieldCode,
              changeStyles
            )}
          </div>`
      )}
    </div>`
  );
}
