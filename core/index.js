export function createElement(type, props, ...children) {
  console.log(type, children);
  const t = (typeof type)
  let el
  if (t === "function") {
    if (props === null) props = {}
    props.children = children
    el = new type(props).el
    // TODO: props children
  } else if (t === "string") {
    el = createNativeNode(type, props, ...children)
  }
  return el
}

function createNativeNode(type, props, ...children) {
  let el = document.createElement(type)
  if (props) {
    Object.keys(props).forEach((key) => {
      el.setAttribute(key, props[key])
    })
  }
  if (children.length > 0) {
    el.append(...children)
  }
  return el
}

export class ZTC {
  constructor(props) {
    this.el = this.render(props)
    this.props = props
    this.beforeMount && this.beforeMount(props)
    this.mount()
    this.mounted && this.mounted(props)
  }
  mount() {
    this.el.append(...this.props.children)
    delete this.props.children
  }
}

export function onMounted(that, cbFn) {
  that.mounted = cbFn.bind(null, that.el)
}

export function render(rootEl, rootComponent) {
  rootEl.append(rootComponent)
  cbFns.forEach(cbFn => {
    cbFn();
    // TODO: remove cbFn
  })
}

let cbFns = []
export function nextTick(that, cbFn) {
  cbFns.push(cbFn)
}