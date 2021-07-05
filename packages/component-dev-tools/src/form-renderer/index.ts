import { html, css, LitElement } from "lit";
import tinycolor from "tinycolor2";

export enum FieldType {
  Integer = "Integer",
  Decimal = "Decimal",
  Text = "Text",
  TextArea = "TextArea",
  Select = "Select",
  Color = "Color", // 颜色选择器
  Cascader = "Cascader", // 级联选择
  Radio = "Radio", // 单选框
  Checkbox = "Checkbox", // 多选框
  DatePicker = "DatePicker", // 日期选择器
  TimePicker = "TimePicker", // 时间选择器
  Picture = "Picture", // 图片
  File = "File", // 文件
  Mentions = "Mentions", // 提及
  Rate = "Rate", // 评分
  Slider = "Slider", // 滑动输入
  Code = "Code", // 代码
}

export namespace FieldType {
  export function getComponent(
    type: FieldType | FieldType[],
    config: any,
    code: any,
    fieldCode: any,
    changeStyles: any
  ) {
    const changeHandler = (e: CustomEvent) => {
      config[code][fieldCode] = e.detail.value;
      changeStyles(config);
    };

    const nativeChangeHandler = (e: any) => {
      const rgb = tinycolor(e?.target?.value).toRgbString();
      config[code][fieldCode] = rgb;
      console.log(e?.target?.value, rgb);

      changeStyles(config);
    };

    switch (type) {
      case FieldType.Integer:
        return html`<zt-integer
          value="${config[code][fieldCode]}"
          @change="${changeHandler}"
        ></zt-integer>`;
      case FieldType.Decimal:
        return html`<zt-decimal
          value="${config[code][fieldCode]}"
          @change="${changeHandler}"
        ></zt-decimal>`;
      case FieldType.Text:
        return html`<zt-text
          value="${config[code][fieldCode]}"
          @change="${changeHandler}"
        ></zt-text>`;
      case FieldType.TextArea:
        return html`<zt-text-area
          value="${config[code][fieldCode]}"
          @change="${changeHandler}"
        ></zt-text-area>`;
      case FieldType.Select:
        return html`<zt-select
          value="${config[code][fieldCode]}"
          @change="${changeHandler}"
        ></zt-select>`;
      case FieldType.Color:
        const hex = `#${tinycolor(config[code][fieldCode]).toHex()}`;
        return html`<input type="color"
          value="${hex}"
          @input="${nativeChangeHandler}"
        ></zt-select>`;
      default:
        return null;
    }
  }
}
