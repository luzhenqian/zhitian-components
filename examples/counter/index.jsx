import { createElement, render, ZTC } from "@/packages/runtime/src/index"
import Counter from './component'

render(document.getElementById('app'),
  <Counter />
)