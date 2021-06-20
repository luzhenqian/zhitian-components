import { ZTC, createElement } from "@/packages/runtime/src/index"
import "./styles.css"

export default class Counter extends ZTC {
  constructor(props) {
    super(props)
    this.state.count = 0
  }

  render() {
    const increase = () => {
      this.state.count += 1
    }

    return <div id="counter" class="counter-contaienr">
      <div>当前累计：<span class="counter-num">{this.state.count}</span></div>
      <button class="counter-btn" onClick={increase}>点击+1</button>
    </div>
  }
}