// import DevTools from "@ztc/dev-tools";
import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import DataConfig from "./data.config";
import StylesConfig from "./styles.config";
import DataDefault from "./data.default";
import StylesDefault from "./styles.default";
import { init } from "echarts";
import ZTComponent from "../zt-component";
// import { ZTComponent } from "@ztc/dev-tools";

@customElement("zhitian-components-bar-chart")
export default class BarChart extends ZTComponent {
  static dataConfig = DataConfig;
  static stylesConfig = StylesConfig;

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }
  `;

  @property({ type: Object })
  styles: any = StylesDefault;

  @property({ type: Array })
  data = DataDefault;

  chart: any;

  @state()
  width = 0;
  @state()
  height = 0;
  observer: ResizeObserver | null = null;
  parent: HTMLElement | null = null;

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

    this.updateSize();

    this.renderChart(option);
  }

  updateSize() {
    const parent = this.parentElement as HTMLElement;
    const { width, height } = parent.getBoundingClientRect();
    this.width = width;
    this.height = height;
    console.log("width, height:", width, height);
  }

  render() {
    return html`
      <div
        id="container"
        style="width:${this.width}px; height:${this.height}px;"
      ></div>
    `;
  }

  firstUpdated() {
    this.parent = this.parentElement as HTMLElement;
    this.observer = new ResizeObserver((entries) => {
      this.updateSize();
      setTimeout(this.chart.resize, 0);
    });
    this.observer.observe(this.parent);
  }

  renderChart(option: any) {
    const container = this.renderRoot.querySelector("#container");
    this.chart;
    if (!this.chart && container) {
      this.chart = init(container as HTMLElement);
      this.chart.setOption(option);
    } else {
      this.chart.setOption(option);
    }
  }

  disconnectedCallback() {
    if (this.observer && this.parent) {
      this.observer.disconnect();
    }
  }
}
