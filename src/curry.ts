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

type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never
type UnwrapPromisify<T> = T extends Promise<infer U> ? U : T

export const tryit = <TFunction extends (...args: any) => any>(func: TFunction) => {
  return async (...args: ArgumentsType<TFunction>): Promise<[Error, UnwrapPromisify<ReturnType<TFunction>>]> => {
    try {
      return [null, await func(...(args as any))]
    } catch (err) {
      return [err as any, null]
    }
  }
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

/**
 * Like a reduce but does not require an array.
 * Only need a number and will iterate the function
 * as many times as specified.
 * 
 * NOTE: This is NOT zero indexed. If you pass count=5 
 * you will get 1, 2, 3, 4, 5 iteration in the callback
 * function
 */
export const iter = <T>(count: number, func: (currentValue: T, iteration: number) => T, initValue: T) => {
  let value = initValue
  for (let i = 1; i <= count; i++) {
    value = func(value, i)
  }
  return value
}

export type Defer = (cb: (err?: Error) => any) => void

/**
 * Useful when for script like things where cleanup 
 * should be done on fail or sucess no matter.
 * 
 * You can call defer many times to register many
 * defered functions that will all be called when
 * the function exits in any state.
 * 
 * 
 * Ex.
 * ```
 * const main = _.defered(async (defer) => {
 * 
 *     fs.writeFile(`${deployment.id}.logs`)
 *     defer(() => {
 *         fs.remove(`${deployment.id}.logs`)
 *     })
 * 
 *     s3.download(...)
 *     defer(() => {
 *         fs.remove(...)
 *     })
 * 
 *     api.deployments.updateStatus('in_progress')
 *     defer((err) => {
 *         api.deployments.updateStatus(err ? 'failed' : 'success')
 *     })
 * 
 * })
 * ```
 */
export const defered = <TArgs extends { [key: string]: any, defer: (cb: (err?: Error) => any) => void }, TResponse>(func: (args?: TArgs) => Promise<TResponse>) => {
  return async (args?: Omit<TArgs, 'defer'>) => {
    let funcs: Function[] = []
    try {
      const result = await func({
        ...args,
        defer: funcs.push.bind(funcs)
      } as TArgs)
      for (const f of funcs) f()
      return result as TResponse
    } catch (err) {
      for (const f of funcs) f(err)
      throw err
    }
  }
}