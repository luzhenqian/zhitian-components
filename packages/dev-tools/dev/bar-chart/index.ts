import ZTComponent from "../../src/zt-component";
import { LitElement, html, css } from "lit";
import {
  customElement,
  property,
} from "lit/decorators.js";
import DataConfig from "./data.config";
import StylesConfig from "./styles.config";
import DataDefault from "./data.default";
import StylesDefault from "./styles.default";
import * as echarts from "echarts";

@customElement("bar-chart")
export default class BarChart extends ZTComponent {
  static dataConfig = DataConfig;
  static stylesConfig = StylesConfig;

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }

    #container {
      width: 300px;
      height: 300px;
    }
  `;

  @property({ type: Object })
  styles: any = StylesDefault;

  @property({ type: Array })
  data = DataDefault;

  updated() {
    let styles = this.styles;
    if (typeof styles === "string") {
      styles = JSON.parse(styles);
    }
    let data = this.data;
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    const xAxisData: any[] = [],
      series: {
        name: any;
        type: any;
        data: any[];
        barWidth: any;
        itemStyle: { color: any; borderRadius: any };
      }[] = [];

    data.forEach((d: any) => {
      xAxisData.push(d.x);
      const item = {
        name: d.sc,
        type: d.t,
        data: [d.y],
        barWidth: styles.bar.width,
        itemStyle: {
          color: styles.bar.color,
          borderRadius: styles.bar.radius,
        },
      };
      const currentSeriesData = series.find((s) => s.name === d.sc);
      if (currentSeriesData) {
        currentSeriesData.data.push(d.y);
      } else {
        series.push(item);
      }
    });

    const option = {
      title: {
        text: "柱状图 Demo",
      },
      tooltip: {},
      legend: {
        data: series.map((s) => s.name),
      },
      xAxis: {
        data: xAxisData,
        show: styles.xAxis.show,
        axisLine: {
          show: styles.xAxis["color.show"],
          lineStyle: {
            color: styles.xAxis.color,
          },
        },
        axisLabel: {
          show: styles.xAxisLabel.show,
          fontSize: styles.xAxisLabel.fontSize,
          fontWeight: styles.xAxisLabel.fontWeight,
          color: styles.xAxisLabel.color,
          rotate: styles.xAxisLabel.rotate,
        },
        splitLine: {
          show: styles.xAxis["gridColor.show"],
          lineStyle: {
            color: styles.xAxis.gridColor,
          },
        },
      },
      yAxis: {},
      series: series,
      grid: {
        left: styles.padding.left,
        right: styles.padding.right,
        top: styles.padding.top,
        bottom: styles.padding.bottom,
      },
    };

    let myChart;
    const container = this.renderRoot.querySelector("#container");
    if (container) {
      myChart = echarts.init(container as HTMLElement);
      myChart.setOption(option);
    }
  }

  render() {
    return html` <div id="container"></div> `;
  }
}
