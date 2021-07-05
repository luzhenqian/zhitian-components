import { html, css, LitElement } from "lit";
import {
  customElement,
  property,
  state,
} from "../../../../node_modules/lit/decorators";
import { FieldType } from "../form-renderer";

@customElement("zt-debug-panel")
export default class DebugPanel extends LitElement {
  static styles = css`
    .container {
      width: 100%;
      height: 100%;
      display: flex;
    }
    ::slotted(*) {
      width: 75%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .panel {
      width: 25%;
    }
  `;

  @state() _children: any = null;
  @state() _stylesConfig: any = [];
  @state() _styles: any = {};

  render() {
    return html`<div class="container"">
      <slot></slot>
      <div>${renderForm(
        this._stylesConfig,
        this._styles,
        this.changeStyles.bind(this)
      )}</div>
    </div> `;
  }

  firstUpdated() {
    this._children = this.children[0];
    this._stylesConfig = (this.children[0].constructor as any).stylesConfig;
    this._styles = (this.children[0] as any).styles;
  }

  updated() {
    this._styles = (this.children[0] as any).styles;
  }

  changeStyles(styles: any) {
    this._styles = JSON.parse(JSON.stringify(styles));
    this._children.styles = this._styles;
  }
}

function renderForm(
  stylesConfig: {
    code: string;
    name: string;
    fieldset: { code: string; name: string; type: FieldType | FieldType[] }[];
  }[],
  stylesDefault: any,
  changeStyles: any
) {
  console.log(stylesDefault, "stylesDefault");

  return stylesConfig.map(
    ({ code, name, fieldset }) => html`<div>
      <span>${name}</span>
      ${fieldset.map(
        (field) =>
          html`<div>
            <span>${field.name}</span>${FieldType.getComponent(
              field.type,
              stylesDefault,
              code,
              field.code,
              changeStyles
            )}
          </div>`
      )}
    </div>`
  );
}
