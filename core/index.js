export { createElement } from "./createElement"
export { ZTC } from "./ZTC"

export function render(rootEl, rootComponent) {
  rootEl.append(rootComponent)
  doNextTickCbFn()
}

let cbFns = []
export function nextTick(cbFn) {
  cbFns.push(cbFn)
}

export function doNextTickCbFn() {
  cbFns.forEach((cbFn,i) => {
    cbFn();
  })
  cbFns = []
}

let state = []

export function useState(initialValue) {
  const state = initialValue
  function setState(newValue) {
    state = newValue
  }
  console.log('useState::', this);
  return [state, setState]
}
