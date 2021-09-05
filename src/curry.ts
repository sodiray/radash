export type Func<TArgs = any, KReturn = any | void> = (...args: TArgs[]) => KReturn

export const chain = (...funcs: Func[]) => (...args: any[]) => {
  return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
}

export const compose = (...funcs: Func[]) => {
  return funcs.reverse().reduce((acc, fn) => fn(acc))
}

export const partob = <T, K, PartialArgs extends Partial<T>>(fn: (args: T) => K, argobj: PartialArgs) => {
  return (restobj: Omit<T, keyof PartialArgs>): K => fn({
    ...(argobj as Partial<T>),
    ...(restobj as Partial<T>)
  } as T)
}

export const partial = (fn: Func, ...args: any[]) => {
  return (...rest: any[]) => fn(...args, ...rest)
}

export const tryit = <ResultType, ErrorType = Error>(func: Func) => async (
  ...args: any[]
): Promise<[null, ResultType] | [ErrorType, null]> => {
  try {
    return [null, await func(...args)]
  } catch (err) {
    return [err as any, null]
  }
}

export const proxied = <T, K>(cb: (arg: T) => K): Record<string, (arg: T) => K> => {
  return new Proxy({}, {
    get: (target, arg: any) => cb(arg)
  })
}

type Cache <T> = Record<string, { exp: number, value: T }>

const memoize = <T>(
  cache: Cache<T>, 
  func: Func<any, T>, 
  keyFunc: Func<string> | null,
  ttl: number
) => {
  return function callWithMemo(...args: any): T {
    const key = keyFunc ? keyFunc(args) : JSON.stringify({ args })
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
  key?: Func<string> | null
  ttl?: number
} = {}) => {
  return memoize({}, func as any, key, ttl) as any as TFunc
}

/**
 * Like a reduce but does not require an array.
 * Only need a number and will iterate the function
 * as many times as specified.
 * 
 * NOTE: This is NOT zero indexed. If you pass count=5 
 * you will get 1, 2, 3, 4, 5 iteration in the callback
 * function
 */
export const iter = <T> (count: number, func: (currentValue: T, iteration: number) => T, initValue: T) => {
  let value = initValue
  for (let i = 1; i <= count; i++) {
    value = func(value, i)
  }
  return value
}