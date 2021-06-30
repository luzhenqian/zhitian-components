enum FieldType {
  Integer, // 整数
  Decimal, // 浮点数
  Text, // 文本
  TextArea, // 长文本
  Select, // 选择器
  Color, // 颜色选择器
  Cascader, // 级联选择
  Radio, // 单选框
  Checkbox, // 多选框
  DatePicker, // 日期选择器
  TimePicker, // 时间选择器
  Picture, // 图片
  File, // 文件
  Mentions, // 提及
  Rate, // 评分
  Slider, // 滑动输入
  Code, // 代码
}

import Integer from "./src/integer";
import Decimal from "./src/decimal";
import Text from "./src/text";
import TextArea from "./src/text-area";
import Select from "./src/select";
import Color from "./src/color";
import Radio from "./src/radio";
import DebugPanel from "./src/debug-panel";

export default {
  Integer,
  Decimal,
  Text,
  TextArea,
  Select,
  Color,
  Radio,
  DebugPanel,
};
