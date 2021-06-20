import { reactive, effect } from "./reactive"

export class ZTC {
  constructor(props) {
    this.props = props

    const state = {}
    this.state = reactive(state)

    this.el = this.render(props)

    effect(() => {
      this.update()
    })

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
    const parent = this.el.parentElement
    this.unMount()
    this.el = this.render(this.props)
    this.mount(parent)
  }
}
