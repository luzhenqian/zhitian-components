let ctx = {};

export function createElement(type, props, ...children) {
  console.log("type:", type);
  console.log("props:", props);
  console.log("children:", children);

  const t = typeof type;
  let el;
  if (t === "function") {
    if (props === null) props = {};
    ctx = new type(props, ...children);
    el = ctx.el;
    // TODO: props children
  } else if (t === "string") {
    el = createNativeNode(type, props, ctx, ...children);
  }
  return el;
}

function createNativeNode(type, props, ctx, ...children) {
  let el = document.createElement(type);
  if (props) {
    Object.keys(props).forEach((key) => {
      if (key.slice(0, 2) === "on") {
        if (typeof props[key] === "function") {
          el.addEventListener(key.slice(2).toLowerCase(), props[key]);
        } else {
          if (ctx.methods) {
            if (props[key] in methods && typeof methods[props[key]] === "function") {
              el.addEventListener(
                key.slice(2).toLowerCase(),
                ctx.methods[props[key]].bind(ctx)
              );
            }
          }
        }
      } else {
        el.setAttribute(key, props[key]);
      }
    });
  }
  if (children.length > 0) {
    el.append(...children);
  }
  return el;
}
