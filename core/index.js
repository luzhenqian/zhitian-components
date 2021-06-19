export function createElement(type, props, ...children) {
  const t = (typeof type)
  let el
  if (t === "function") {
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
    this.mounted && this.mounted(props)
  }
}

let cbFns = []

export function onMounted(fn) {
  cbFns.push(fn)
}

export function render(rootEl, rootComponent) {
  rootEl.append(rootComponent)
  cbFns.forEach(cbFn => cbFn())
}