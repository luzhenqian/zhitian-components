import { createElement, render, ZTC } from "@/core"
import EchartsDemo from '@/components/echarts-demo/index.ztc'
import Counter from '@/components/counter/index.jsx'

render(document.getElementById('app'),
  <div>
    <div style="width:400px; height: 400px">
      <EchartsDemo />
    </div>
    <Counter />
  </div>)