export type Func<TArgs = any, KReturn = any | void> = (
  ...args: TArgs[]
) => KReturn

export const chain =
  (...funcs: Func[]) =>
  (...args: any[]) => {
    return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
  }

export const compose = (...funcs: Func[]) => {
  return funcs.reverse().reduce((acc, fn) => fn(acc))
}

export const partial = (fn: Func, ...args: any[]) => {
  return (...rest: any[]) => fn(...args, ...rest)
}

/**
 * Like partial but for unary functions that accept
 * a single object argument
 */
export const partob = <T, K, PartialArgs extends Partial<T>>(
  fn: (args: T) => K,
  argobj: PartialArgs
) => {
  return (restobj: Omit<T, keyof PartialArgs>): K =>
    fn({
      ...(argobj as Partial<T>),
      ...(restobj as Partial<T>)
    } as T)
}

/**
 * Creates a Proxy object that will dynamically
 * call the handler argument when attributes are
 * accessed
 */
export const proxied = <T, K>(
  handler: (propertyName: T) => K
): Record<string, K> => {
  return new Proxy(
    {},
    {
      get: (target, propertyName: any) => handler(propertyName)
    }
  )
}

type Cache<T> = Record<string, { exp: number; value: T }>

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

/**
 * Creates a memoized function using the key and ttl
 * options. The returned function will only execute
 * the source function when no value has previously
 * been computed or the previous value has expired
 */
export const memo = <TFunc extends Function>(
  func: TFunc,
  {
    key = null,
    ttl = 300
  }: {
    key?: Func<any, string> | null
    ttl?: number
  } = {}
) => {
  return memoize({}, func as any, key, ttl) as any as TFunc
}

export type DebounceFunction<TArgs extends any[]> = {
  (...args: TArgs): void;
  /**
   * Cancels the debounced function
   */
  cancel(): void;
  /**
   * Runs the debounced function immediately
   */
  flush(...args: TArgs): void;
}

/**
 * Given a delay and a function returns a new function
 * that will only call the source function after delay
 * milliseconds have passed without any invocations.
 *  
 * The debounce function comes with a `cancel` method 
 * to cancel delayed `func` invocations and a `flush` 
 * method to invoke them immediately
 */
export const debounce = <TArgs extends any[]>(
  { delay }: { delay: number },
  func: (...args: TArgs) => any
) => {
  let timer: NodeJS.Timeout = null
  let active = true 

  const debounced: DebounceFunction<TArgs> = (...args: TArgs) => {
    if (active) {
      clearTimeout(timer)
      timer = setTimeout(() => { 
        active && func(...args)
      }, delay)
    }
    else { 
      func(...args)
    }
  }
  debounced.cancel = () => { 
    active = false
  }
  debounced.flush = (...args: TArgs) => func(...args)

  return debounced
}

/**
 * Given an interval and a function returns a new function
 * that will only call the source function if interval milliseconds
 * have passed since the last invocation
 */
export const throttle = <TArgs extends any[]>(
  { interval }: { interval: number },
  func: (...args: TArgs) => any
): ((...args: TArgs) => any) => {
  let ready = true
  const throttled = (...args: TArgs) => {
    if (!ready) return
    func(...args)
    ready = false
    setTimeout(() => {
      ready = true
    }, interval)
  }
  return throttled as unknown as (...args: TArgs) => any
}
