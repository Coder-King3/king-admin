// ref包装类
export class Ref<T = any> {
  private _value: T
  constructor(value: T) {
    this._value = value
  }
  get value() {
    return this._value
  }
  set value(newVal) {
    this._value = newVal
  }
}

// ref函数
export function ref<T = any>(value: T) {
  return new Proxy(new Ref<T>(value), {
    get(target, property, receiver) {
      return Reflect.get(target, property, receiver)
    },
    set(target, property, newValue, receiver) {
      return Reflect.set(target, property, newValue, receiver)
    }
  })
}
