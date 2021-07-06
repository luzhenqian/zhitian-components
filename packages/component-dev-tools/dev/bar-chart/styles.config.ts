export default [
  {
    code: "bar",
    name: "柱子样式",
    fieldset: [
      { code: "width", name: "柱子宽度", type: "Slider" },
      { code: "color", name: "柱子颜色", type: "Color" },
      { code: "radius", name: "柱子圆角度", type: "Slider" },
    ],
  },
  {
    code: "padding",
    name: "边距",
    fieldset: [
      { code: "top", name: "顶部", type: "Integer" },
      { code: "bottom", name: "底部", type: "Integer" },
      { code: "left", name: "左侧", type: "Integer" },
      { code: "right", name: "右侧", type: "Integer" },
    ],
  },
  {
    code: "xAxis",
    name: "x 轴",
    show: true,
    fieldset: [
      {
        code: "color",
        name: "坐标轴颜色",
        type: "Color",
        show: true,
      },
      {
        code: "gridColor",
        name: "网格线颜色",
        type: "Color",
        show: true,
      },
    ],
  },
  {
    code: "xAxisLabel",
    name: "x 轴标签",
    show: true,
    fieldset: [
      {
        code: "fontSize",
        name: "轴标签字号",
        type: "Integer",
      },
      {
        code: "fontColor",
        name: "轴标签颜色",
        type: "Color",
      },
      {
        code: "fontWeight",
        name: "字体粗细",
        type: [
          {
            type: "Select",
            options: [
              { label: "Normal", value: "常规" },
              { label: "Bold", value: "加粗" },
              { label: "Bolder", value: "极粗" },
              { label: "Lighter", value: "极细" },
            ],
          },
          {
            type: "Integer",
            min: 100,
            max: 1000,
          },
        ],
      },
      {
        code: "rotate",
        name: "角度",
        type: "Integer",
        min: -90,
        max: 90,
      },
    ],
  },
];
