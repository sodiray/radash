type Func = (...args: any[]) => any | void

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
): Promise<[ErrorType | null, ResultType] | [ErrorType, ResultType | null]> => {
  try {
    return [null, await func(...args)]
  } catch (err) {
    return [err, null]
  }
}

export const proxied = <T, K> (cb: (arg: T) => K): Record<string, (arg: T) => K> => {
  return new Proxy({}, {
    get: (target, arg: any) => cb(arg)
  })
}