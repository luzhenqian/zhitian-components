import { createElement, render, ZTC } from "@/core"
import Counter from './counter/component'
import BarChart from './bar-chart/component'
import "./styles.css"

class List extends ZTC {
  constructor(props) {
    super(props)
  }
  render(props) {
    const select = (exampleID) => {
      this.emit('changeActive', exampleID);
    }
    return <ul class={props.class}>
      <li class={`examples-nav-item ${props.active === "counter" ? "active" : ""}`}
        onClick={() => select('counter')}>计数器</li>
      <li class={`examples-nav-item ${props.active === "barChart" ? "active" : ""}`}
        onClick={() => select('barChart')}>柱状图</li>
    </ul>
  }
}

class Example extends ZTC {
  constructor(props) {
    super(props)
    this.state.active = "counter"
  }
  render() {
    const changeActive = (exampleID) => {
      this.state.active = exampleID
    }
    const exampleMap = {
      'counter': <Counter />,
      'barChart': <div style="width:400px; height: 400px">
        <BarChart />
      </div>
    }
    return <div class="examples-container">
      <List class="examples-nav" changeActive={changeActive} active={this.state.active} />
      <div class="examples-content">
        {exampleMap[this.state.active]}
      </div>
    </div>
  }
}

render(
  document.getElementById('app'),
  <Example />
)