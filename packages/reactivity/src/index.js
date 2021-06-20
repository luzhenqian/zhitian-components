export default class Reactive {
  constructor(callback) {
    this.targetMap = new WeakMap()
    this.callback = callback
  }
  reactive(target) {
    const callback = this.callback
    const that = this
    if (!isObject(target)) return target
    const handler = {
      get(target, propertyKey, receiver) {
        const result = Reflect.get(target, propertyKey, receiver)
        return that.convert.bind(that)(result)
      },
      set(target, propertyKey, value, receiver) {
        let result = true
        const oldValue = Reflect.set(target, propertyKey, value, receiver)
        if (oldValue !== value) {
          result = Reflect.set(target, propertyKey, value, receiver)
        }
        callback()
        return that.convert.bind(that)(result)
      },
      deleteProperty(target, propertyKey) {
        const hadKey = Object.prototype.hasOwnProperty.call(target, propertyKey)
        const result = Reflect.deleteProperty(target, propertyKey, value, receiver)
        return result
      }
    }

    return new Proxy(target, handler)
  }
  convert(target) {
    return isObject(target) ? this.reactive(target) : target
  }
}

const isObject = target => target !== null && typeof target === "object"
