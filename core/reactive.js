
/**
 * @description 判断一个变量的类型是否为 object
 * @param {*} target
 * @returns {boolean}
 */
const isObject = target => target !== null && typeof target === "object"

/**
 * @description 将对象转换为响应式对象
 * @param {object|*} target 
 * @returns {Proxy|*}
 */
export function reactive(target) {
  if (!isObject(target)) return target
  const handler = {
    get(target, propertyKey, receiver) {
      track(target, propertyKey)
      const result = Reflect.get(target, propertyKey, receiver)
      return convert(result)
    },
    set(target, propertyKey, value, receiver) {
      let result = true
      const oldValue = Reflect.set(target, propertyKey, value, receiver)
      if (oldValue !== value) {
        result = Reflect.set(target, propertyKey, value, receiver)
        trigger(target, propertyKey)
      }
      return result
    },
    deleteProperty(target, propertyKey) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, propertyKey)
      const result = Reflect.deleteProperty(target, propertyKey, value, receiver)
      if (hadKey && result) {
        trigger(target, propertyKey)
      }
      return result
    }
  }

  return new Proxy(target, handler)
}

/**
 * @description 如果属性为对象，递归转换为代理对象
 * @param {*} target
 * @returns {*}
 */
const convert = target => isObject(target) ? reactive(target) : target

/**
* @type {function|null}
*/
let activeCallback = null
/**
 * 执行回调函数
 * @param {*} callback 回调函数
 */
export function effect(callback) {
  activeCallback = callback
  callback()
  activeCallback = null
}
/**
 * @type {WeakMap<object, Map<string|number|symbol, Set<Function>>>}
 */
let targetMap = new WeakMap()
/**
 * 收集依赖
 * @param {object} target 
 * @param {string|number|symbol} key 
 */
export function track(target, key) {
  if (activeCallback === null) return
  const depsMap = getDepsMap(target)
  const dep = getDep(depsMap, key)
  dep.add(activeCallback)
}

/**
 * 获取依赖集合
 * @param {object} target 
 * @returns {Map<string|number|symbol, Set<Function>>}
 */
function getDepsMap(target) {
  if (!targetMap.has(target)) {
    targetMap.set(target, new Map())
  }
  return targetMap.get(target)
}

/**
 * 获取依赖
 * @param {Map} depsMap
 * @param {string|number|symbol} key 
 * @returns {Set<Function>}
 */
function getDep(depsMap, key) {
  if (!depsMap.has(key)) {
    depsMap.set(key, new Set())
  }
  return depsMap.get(key)
}

/**
 * @description 触发更新
 * @param {object} target 
 * @param {string|number|symbol} key 
 */
export function trigger(target, key) {
  if (!targetMap.has(target)) return
  const depsMap = targetMap.get(target)
  if (!depsMap.has(key)) return
  const dep = depsMap.get(key)
  dep.forEach((callback) => {
    callback()
  })
}