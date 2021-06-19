import EchartsDemo from './echarts-demo.ztc'
import { createElement, ZTC, render } from "../core/index"

class B extends ZTC {
  render(props) {
    return <div id="b">1
      <div>c</div>
      <div><span>hi</span><button>i'm button</button></div>
    </div>
  }
}

class MyComponent extends ZTC {
  render(props) {
    console.log(props);
    return <div id="test" {...props}>
      <div id="1">1</div>
      <B id="2">2</B>
      <div id="3">3</div>
      <EchartsDemo style="width: 600px; height: 400px" />
    </div>
  }
}

const com = <MyComponent />

render(document.getElementById('app'), com)