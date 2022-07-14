export type Func<TArgs = any, KReturn = any | void> = (...args: TArgs[]) => KReturn

export const chain = (...funcs: Func[]) => (...args: any[]) => {
  return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
}

export const compose = (...funcs: Func[]) => {
  return funcs.reverse().reduce((acc, fn) => fn(acc))
}

export const partial = (fn: Func, ...args: any[]) => {
  return (...rest: any[]) => fn(...args, ...rest)
}

/**
 * Like partial but for unary functions
 */
export const partob = <T, K, PartialArgs extends Partial<T>>(fn: (args: T) => K, argobj: PartialArgs) => {
  return (restobj: Omit<T, keyof PartialArgs>): K => fn({
    ...(argobj as Partial<T>),
    ...(restobj as Partial<T>)
  } as T)
}

export const proxied = <T, K>(handler: (propertyName: T) => K): Record<string, K> => {
  return new Proxy({}, {
    get: (target, propertyName: any) => handler(propertyName)
  })
}

type Cache<T> = Record<string, { exp: number, value: T }>

const memoize = <T>(
  cache: Cache<T>,
  func: Func<any, T>,
  keyFunc: Func<string> | null,
  ttl: number
) => {
  return function callWithMemo(...args: any): T {
    const key = keyFunc ? keyFunc(...args) : JSON.stringify({ args })
    const existing = cache[key]
    if (existing !== undefined) {
      if (existing.exp > new Date().getTime()) {
        return existing.value
      }
    }
    const result = func(...args)
    cache[key] = {
      exp: new Date().getTime() + ttl,
      value: result
    }
    return result
  }
}

export const memo = <TFunc extends Function>(func: TFunc, {
  key = null,
  ttl = 300
}: {
  key?: Func<any, string> | null
  ttl?: number
} = {}) => {
  return memoize({}, func as any, key, ttl) as any as TFunc
}
