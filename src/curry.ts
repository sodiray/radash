export function chain<T1 extends any[], T2, T3>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3
): (...arg: T1) => T3
export function chain<T1 extends any[], T2, T3, T4>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4
): (...arg: T1) => T4
export function chain<T1 extends any[], T2, T3, T4, T5>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5
): (...arg: T1) => T5
export function chain<T1 extends any[], T2, T3, T4, T5, T6>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6
): (...arg: T1) => T6
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7
): (...arg: T1) => T7
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8
): (...arg: T1) => T8
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9
): (...arg: T1) => T9
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9,
  f9: (arg: T3) => T10
): (...arg: T1) => T10
export function chain<
  T1 extends any[],
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11
>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9,
  f9: (arg: T3) => T10,
  f10: (arg: T3) => T11
): (...arg: T1) => T11
export function chain(...funcs: ((...args: any[]) => any)[]) {
  return (...args: any[]) => {
    return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
  }
}

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => LastResult
  ) => (...args: F1Args) => F1Result,
  last: (...args: F1NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2Result,
  F2NextArgs extends any[],
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => LastResult
  ) => (...args: F1NextArgs) => F2Result,
  last: (...args: F2NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => LastResult
  ) => (...args: F2NextArgs) => F3Result,
  last: (...args: F3NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => LastResult
  ) => (...args: F3NextArgs) => F4Result,
  last: (...args: F4NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => LastResult
  ) => (...args: F4NextArgs) => F5Result,
  last: (...args: F5NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => LastResult
  ) => (...args: F5NextArgs) => F6Result,
  last: (...args: F6NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  F7NextArgs extends any[],
  F7Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => F7Result
  ) => (...args: F5NextArgs) => F6Result,
  f7: (
    next: (...args: F7NextArgs) => LastResult
  ) => (...args: F6NextArgs) => F7Result,
  last: (...args: F7NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  F7NextArgs extends any[],
  F7Result,
  F8NextArgs extends any[],
  F8Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => F7Result
  ) => (...args: F5NextArgs) => F6Result,
  f7: (
    next: (...args: F7NextArgs) => LastResult
  ) => (...args: F6NextArgs) => F7Result,
  f8: (
    next: (...args: F8NextArgs) => LastResult
  ) => (...args: F7NextArgs) => F8Result,
  last: (...args: F8NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  F7NextArgs extends any[],
  F7Result,
  F8NextArgs extends any[],
  F8Result,
  F9NextArgs extends any[],
  F9Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => F7Result
  ) => (...args: F5NextArgs) => F6Result,
  f7: (
    next: (...args: F7NextArgs) => LastResult
  ) => (...args: F6NextArgs) => F7Result,
  f8: (
    next: (...args: F8NextArgs) => LastResult
  ) => (...args: F7NextArgs) => F8Result,
  f9: (
    next: (...args: F9NextArgs) => LastResult
  ) => (...args: F8NextArgs) => F9Result,
  last: (...args: F9NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose(...funcs: ((...args: any[]) => any)[]) {
  return funcs.reverse().reduce((acc, fn) => fn(acc))
}

export const partial = <T extends any[], R>(
  fn: (...args: T) => R,
  ...args: Partial<T>
) => {
  return (...rest: T) => fn(...([...args, ...rest] as T))
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

const memoize = <TArgs extends any[], TResult>(
  cache: Cache<TResult>,
  func: (...args: TArgs) => TResult,
  keyFunc: ((...args: TArgs) => string) | null,
  ttl: number | null
) => {
  return function callWithMemo(...args: any): TResult {
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
export const memo = <
  TArgs extends any[],
  TFunc extends (...args: TArgs) => any
>(
  func: TFunc,
  options: {
    key?: (...args: TArgs) => string
    ttl?: number
  } = {}
) => {
  return memoize({}, func, options.key ?? null, options.ttl ?? null) as TFunc
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

export type ThrottledFunction<TArgs extends any[]> = {
  (...args: TArgs): void
  /**
   * Checks if there is any invocation throttled
   */
  isThrottled(): boolean
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
) => {
  let ready = true
  let timer: NodeJS.Timeout | undefined = undefined

  const throttled: ThrottledFunction<TArgs> = (...args: TArgs) => {
    if (!ready) return
    func(...args)
    ready = false
    timer = setTimeout(() => {
      ready = true
      timer = undefined
    }, interval)
  }
  throttled.isThrottled = () => {
    return timer !== undefined
  }
  return throttled
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
  TFunc extends (...args: any) => any
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
