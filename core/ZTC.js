import { doNextTickCbFn } from "."
import Reactive from "./reactive"

export class ZTC {
  constructor(props) {
    this.props = props
    this.name = this.constructor.name
    const reactive = new Reactive(this.update.bind(this))
    this.state = reactive.reactive({})

    this.el = this.render(props, this.state)

    this.mount()
  }

  mount(container) {
    this.beforeMount && this.beforeMount(this.props)
    if (container) container.appendChild(this.el)
    this.mounted && this.mounted(this.props)
  }

  unMount() {
    if (this.el.parentElement) { this.el.parentElement.removeChild(this.el) }
  }

  update() {
    if (!this.el) return
    const parent = this.el.parentElement
    this.unMount()
    this.el = this.render(this.props, this.state)
    this.mount(parent)
    doNextTickCbFn()
  }

  emit(eventName, ...args) {
    const evnet = this.props[eventName]
    if (!typeof this.props[eventName] === "function") {
      throw Error(`${eventName} is not a function`)
    }
    evnet(...args)
  }
}
