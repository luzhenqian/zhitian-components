import { createElement, ZTC } from "@/core"

export default class Counter extends ZTC {
  constructor(props) {
    super(props)
    this.state.count = 0
  }
  increase() {
    console.log('increase', this);
    this.state.count += 1
  }
  render() {
    console.log(this);
    return <div id="counter">
      <div>当前累计：{this.state.count}</div>
      <button onClick={this.increase.bind(this)}>点击+1</button>
    </div>
  }
}