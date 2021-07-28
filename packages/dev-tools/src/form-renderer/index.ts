import { html } from "lit";
import tinycolor from "tinycolor2";
import { DecimalProps } from "../decimal";
import { IntegerProps } from "../integer";
import { SelectProps } from "../select";

export namespace FormRenderer {
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

  export function getComponent(
    type: FieldType | FieldType[],
    options: any,
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
      changeStyles(config);
    };

    const fieldset = new Map();

    fieldset
      .set(
        FieldType.Integer,
        (options?: IntegerProps) => html`<zt-integer
          value="${config[code][fieldCode]}"
          @change="${changeHandler}"
          ${options && "min" in options ? 'min="${options.min}"' : ""}
          ${options && "max" in options ? 'max="${options.max}"' : ""}
          ${options && "placeholder" in options
            ? 'placeholder="${options.placeholder}"'
            : ""}
        ></zt-integer>`
      )
      .set(
        FieldType.Decimal,
        (options?: DecimalProps) => html`<zt-decimal
          value="${config[code][fieldCode]}"
          @change="${changeHandler}"
          ${options && "min" in options ? 'min="${options.min}"' : ""}
          ${options && "max" in options ? 'max="${options.max}"' : ""}
          ${options && "fixed" in options ? 'fixed="${options.fixed}"' : ""}
          ${options && "placeholder" in options
            ? 'placeholder="${options.placeholder}"'
            : ""}
        ></zt-decimal>`
      )
      .set(
        FieldType.Text,
        (options?: DecimalProps) => html`<zt-text
          value="${config[code][fieldCode]}"
          @change="${changeHandler}"
        ></zt-text>`
      )
      .set(
        FieldType.TextArea,
        () => html`<zt-text-area
          value="${config[code][fieldCode]}"
          @change="${changeHandler}"
        ></zt-text-area>`
      )
      .set(
        FieldType.Select,
        (options?: SelectProps) => html`<zt-select
          value="${config[code][fieldCode]}"
          @change="${changeHandler}"
          options="${options && "options" in options
            ? JSON.stringify(options.options)
            : ""}"
          ${options && "placeholder" in options
            ? 'placeholder="${options.placeholder}"'
            : ""}
        ></zt-select>`
      )
      .set(FieldType.Color, () => {
        const hex = `#${tinycolor(config[code][fieldCode]).toHex()}`;
        return html`<input type="color"
          value="${hex}"
          @input="${nativeChangeHandler}"
        ></zt-select>`;
      })
      .set(FieldType.Slider, () => {
        const slider: any = document.createElement("zt-slider");
        slider.value = config[code][fieldCode];
        slider.addEventListener("change", (e: any) => changeHandler(e));
        if (options) {
          slider.max = options.max;
        }
        return slider;
      });

    if (fieldset.has(type)) return fieldset.get(type)(options);
    return null;
  }
}
