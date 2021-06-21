import { createElement, render, ZTC } from "@/packages/runtime/src"
import Counter from './component'

render(document.getElementById('app'),
  <Counter />
)