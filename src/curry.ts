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

type Cache<T> = Record<string, { exp: number | null; value: T }>

const memoize = <T>(
  cache: Cache<T>,
  func: Func<any, T>,
  keyFunc: Func<string> | null,
  ttl: number | null
) => {
  return function callWithMemo(...args: any): T {
    const key = keyFunc ? keyFunc(...args) : JSON.stringify({ args })
    const existing = cache[key]
    if (existing !== undefined) {
      if (!existing.exp) return existing.value
      if (existing.exp > new Date().getTime()) {
        return existing.value
      }
    }
    const result = func(...args)
    cache[key] = {
      exp: ttl ? new Date().getTime() + ttl : null,
      value: result
    }
    return result
  }
}

/**
 * Creates a memoized function. The returned function
 * will only execute the source function when no value
 * has previously been computed. If a ttl (milliseconds)
 * is given previously computed values will be checked
 * for expiration before being returned.
 */
export const memo = <TFunc extends Function>(
  func: TFunc,
  options: {
    key?: Func<any, string>
    ttl?: number
  } = {}
) => {
  return memoize(
    {},
    func as any,
    options.key ?? null,
    options.ttl ?? null
  ) as any as TFunc
}

export type DebounceFunction<TArgs extends any[]> = {
  (...args: TArgs): void
  /**
   * Cancels the debounced function
   */
  cancel(): void
  /**
   * Checks if there is any invocation debounced
   */
  isPending(): boolean
  /**
   * Runs the debounced function immediately
   */
  flush(...args: TArgs): void
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
  let timer: NodeJS.Timeout | undefined = undefined
  let active = true

  const debounced: DebounceFunction<TArgs> = (...args: TArgs) => {
    if (active) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        active && func(...args)
        timer = undefined
      }, delay)
    } else {
      func(...args)
    }
  }
  debounced.isPending = () => {
    return timer !== undefined
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

/**
 * Make an object callable. Given an object and a function
 * the returned object will be a function with all the
 * objects properties.
 *
 * @example
 * ```typescript
 * const car = callable({
 *   wheels: 2
 * }, self => () => {
 *   return 'driving'
 * })
 *
 * car.wheels // => 2
 * car() // => 'driving'
 * ```
 */
export const callable = <
  TValue,
  TObj extends Record<string | number | symbol, TValue>,
  TFunc extends Function
>(
  obj: TObj,
  fn: (self: TObj) => TFunc
): TObj & TFunc => {
  /* istanbul ignore next */
  const FUNC = () => {}
  return new Proxy(Object.assign(FUNC, obj), {
    get: (target, key: string) => target[key],
    set: (target, key: string, value: any) => {
      ;(target as any)[key] = value
      return true
    },
    apply: (target, self, args) => fn(Object.assign({}, target))(...args)
  }) as unknown as TObj & TFunc
}
