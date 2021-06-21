import { ZTC, createElement } from "@/packages/runtime/src"
import { init } from "echarts";
import { nextTick } from "@/packages/runtime/src";
import defaultStyle from "./style.default.json";
import defaultData from "./data.default.json";
import "./styles.css"

export default class BarChart extends ZTC {
  constructor(props) {
    super(props)
  }

  render() {
    const xAxisData = [],
      series = [];

    let { style, data } = this.props;
    if (!style) style = defaultStyle
    if (!data) data = defaultData

    data.forEach((d) => {
      xAxisData.push(d.x);
      const item = {
        name: d.sc,
        type: d.t,
        data: [d.y],
        barWidth: style.bar.width,
        itemStyle: {
          color: style.bar.color,
          borderRadius: style.bar.radius,
        },
      };
      const currentSeriesData = series.find((s) => s.name === d.sc);
      if (currentSeriesData) {
        currentSeriesData.data.push(d.y);
      } else {
        series.push(item);
      }
    });

    this.option = {
      title: {
        text: "柱状图 Demo",
      },
      tooltip: {},
      legend: {
        data: series.map((s) => s.name),
      },
      xAxis: {
        data: xAxisData,
        show: style.xAxis.show,
        axisLine: {
          show: style.xAxis["color.show"],
          lineStyle: {
            color: style.xAxis.color,
          },
        },
        axisLabel: {
          show: style.xAxisLabel.show,
          fontSize: style.xAxisLabel.fontSize,
          fontWeight: style.xAxisLabel.fontWeight,
          color: style.xAxisLabel.color,
          rotate: style.xAxisLabel.rotate,
        },
        splitLine: {
          show: style.xAxis["gridColor.show"],
          lineStyle: {
            color: style.xAxis.gridColor,
          },
        },
      },
      yAxis: {},
      series: series,
      grid: {
        left: style.padding.left,
        right: style.padding.right,
        top: style.padding.top,
        bottom: style.padding.bottom,
      },
    };

    nextTick(() => {
      if (this.el.parentElement) {
        const height = `${this.el.parentElement.getBoundingClientRect().height
          }px`;
        const width = `${this.el.parentElement.getBoundingClientRect().width}px`;
        this.el.style.height = height;
        this.el.style.width = width;
      }
      this.myChart.resize();
    });

    return <div></div>
  }

  mounted() {
    this.myChart = init(this.el);
    this.el.style.height = "1000px";
    this.myChart.setOption(this.option);
  };
}