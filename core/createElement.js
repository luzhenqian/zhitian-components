export function createElement(type, props, ...children) {
  // console.log('type:', type);
  // console.log('props:', props);
  // console.log('children:', children);

  const t = (typeof type)
  let el
  if (t === "function") {
    if (props === null) props = {}
    el = new type(props, ...children).el
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
      if (key.slice(0, 2) === "on") {
        el.addEventListener(key.slice(2).toLowerCase(), props[key])
      } else {
        el.setAttribute(key, props[key])
      }
    })
  }
  if (children.length > 0) {
    el.append(...children)
  }
  return el
}
