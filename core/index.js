export { createElement } from "./createElement"
export { ZTC } from "./ZTC"

export function render(rootEl, rootComponent) {
  rootEl.append(rootComponent)
  cbFns.forEach(cbFn => {
    cbFn();
    // TODO: remove cbFn
  })
}

let cbFns = []
export function nextTick(cbFn) {
  cbFns.push(cbFn)
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
