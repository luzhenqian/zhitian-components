import { html } from "lit";
import tinycolor from "tinycolor2";
import { CheckboxProps } from "../checkbox";
import { StylesConfig } from "../debug-panel";
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

  const fieldset = new Map();
  const cache = new Map();

  export function init(
    stylesConfig: StylesConfig,
    stylesDefault: any,
    changeStyles: any
  ) {
    (stylesConfig || []).map(({ fieldset: fs }) =>
      fs.map(() => {
        const genHandlerFn = (code: string, fieldCode: string) => {
          const changeHandler = (e: CustomEvent) => {
            stylesDefault[code][fieldCode] = e.detail.value;
            changeStyles(stylesDefault);
          };

          const nativeChangeHandler = (e: any) => {
            const rgb = tinycolor(e?.target?.value).toRgbString();
            stylesDefault[code][fieldCode] = rgb;
            changeStyles(stylesDefault);
          };
          return {
            changeHandler,
            nativeChangeHandler,
          };
        };

        fieldset
          .set(
            FieldType.Integer,
            (options: IntegerProps, code: string, fieldCode: string) => {
              const integer: any = document.createElement("zt-integer");
              integer.value = stylesDefault[code][fieldCode];
              integer.addEventListener(
                "change",
                genHandlerFn(code, fieldCode).changeHandler
              );
              if (options) {
                if (options.hasOwnProperty("min")) {
                  integer.min = options.min;
                }
                if (options.hasOwnProperty("max")) {
                  integer.max = options.max;
                }
                if (options.hasOwnProperty("placeholder")) {
                  integer.placeholder = options.placeholder;
                }
              }
              return integer;
            }
          )
          .set(
            FieldType.Decimal,
            (
              options: DecimalProps,
              code: string,
              fieldCode: string
            ) => html`<zt-decimal
              value="${stylesDefault[code][fieldCode]}"
              @change="${genHandlerFn(code, fieldCode).changeHandler}"
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
            (
              options: DecimalProps,
              code: string,
              fieldCode: string
            ) => html`<zt-text
              value="${stylesDefault[code][fieldCode]}"
              @change="${genHandlerFn(code, fieldCode).changeHandler}"
            ></zt-text>`
          )
          .set(
            FieldType.TextArea,
            (
              options: any,
              code: string,
              fieldCode: string
            ) => html`<zt-text-area
              value="${stylesDefault[code][fieldCode]}"
              @change="${genHandlerFn(code, fieldCode).changeHandler}"
            ></zt-text-area>`
          )
          .set(
            FieldType.Select,
            (
              options: SelectProps,
              code: string,
              fieldCode: string
            ) => html`<zt-select
              value="${stylesDefault[code][fieldCode]}"
              @change="${genHandlerFn(code, fieldCode).changeHandler}"
              options="${options && "options" in options
                ? JSON.stringify(options.options)
                : ""}"
              ${options && "placeholder" in options
                ? 'placeholder="${options.placeholder}"'
                : ""}
            ></zt-select>`
          )
          .set(
            FieldType.Color,
            (options: any, code: string, fieldCode: string) => {
              const hex = `#${tinycolor(
                stylesDefault[code][fieldCode]
              ).toHex()}`;
              return html`<input type="color"
          value="${hex}"
          @input="${genHandlerFn(code, fieldCode).nativeChangeHandler}"
        ></zt-select>`;
            }
          )
          .set(
            FieldType.Slider,
            (options: any, code: string, fieldCode: string) => {
              const slider: any = document.createElement("zt-slider");
              slider.value = stylesDefault[code][fieldCode];
              slider.addEventListener("change", (e: any) =>
                genHandlerFn(code, fieldCode).changeHandler(e)
              );
              if (options) {
                slider.max = options.max;
              }
              return slider;
            }
          )
          .set(
            FieldType.Checkbox,
            (options: CheckboxProps, code: string, fieldCode: string) => {
              const checkbox: any = document.createElement("zt-checkbox");
              checkbox.value = stylesDefault[code][fieldCode];
              checkbox.addEventListener(
                "change",
                genHandlerFn(code, fieldCode).changeHandler
              );
              if (options) {
                if (options.hasOwnProperty("checkOption")) {
                  checkbox.checkOption = options.checkOption;
                }
                if (options.hasOwnProperty("defaultCheckedList")) {
                  checkbox.defaultCheckedList = options.defaultCheckedList;
                }
              }
              return checkbox;
            }
          );
      })
    );
  }

  export function getComponent(
    type: FieldType | FieldType[],
    options: any,
    config: any,
    code: any,
    fieldCode: any
  ) {
    const key = type + code + fieldCode;
    if (cache.has(key)) {
      return cache.get(key);
    }
    if (fieldset.has(type)) {
      const fieldComponent = fieldset.get(type)(options, code, fieldCode);
      cache.set(key, fieldComponent);
      return fieldComponent;
    }
    return null;
  }
}
