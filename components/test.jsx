import { createElement, render, ZTC } from "@/core"
import EchartsDemo from '@/components/echarts-demo/index.ztc'

class Button extends ZTC {
  render() {
    return <button>按钮</button>
  }
}

render(document.getElementById('app'), <div style="width:400px; height: 400px"><EchartsDemo /><Button>
  <Button></Button>
  <Button></Button>
</Button></div>)