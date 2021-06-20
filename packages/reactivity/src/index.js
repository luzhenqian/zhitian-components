export default class Reactive {
  constructor(callback) {
    this.activeCallback = null
    this.targetMap = new WeakMap()
    this.callback = callback
  }
  reactive(target) {
    const callback = this.callback
    if (!isObject(target)) return target
    const handler = {
      get(target, propertyKey, receiver) {
        const result = Reflect.get(target, propertyKey, receiver)
        return result
      },
      set(target, propertyKey, value, receiver) {
        let result = true
        const oldValue = Reflect.set(target, propertyKey, value, receiver)
        if (oldValue !== value) {
          result = Reflect.set(target, propertyKey, value, receiver)
        }
        callback()
        return result
      },
      deleteProperty(target, propertyKey) {
        const hadKey = Object.prototype.hasOwnProperty.call(target, propertyKey)
        const result = Reflect.deleteProperty(target, propertyKey, value, receiver)
        return result
      }
    }

    return new Proxy(target, handler)
  }
}

const isObject = target => target !== null && typeof target === "object"
