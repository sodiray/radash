import { fork, list, range, sort } from './array'
import { isArray } from './typed'

/**
 * An async reduce function. Works like the
 * built-in Array.reduce function but handles
 * an async reducer function
 */
export const reduce = async <T, K>(
  array: readonly T[],
  asyncReducer: (acc: K, item: T, index: number) => Promise<K>,
  initValue?: K
): Promise<K> => {
  const initProvided = initValue !== undefined
  if (!initProvided && array?.length < 1) {
    throw new Error('Cannot reduce empty array with no init value')
  }
  const iter = initProvided ? array : array.slice(1)
  let value: any = initProvided ? initValue : array[0]
  for (const [i, item] of iter.entries()) {
    value = await asyncReducer(value, item, i)
  }
  return value
}

/**
 * An async map function. Works like the
 * built-in Array.map function but handles
 * an async mapper function
 */
export const map = async <T, K>(
  array: readonly T[],
  asyncMapFunc: (item: T, index: number) => Promise<K>
): Promise<K[]> => {
  if (!array) return []
  let result = []
  let index = 0
  for (const value of array) {
    const newValue = await asyncMapFunc(value, index++)
    result.push(newValue)
  }
  return result
}

/**
 * Useful when for script like things where cleanup
 * should be done on fail or sucess no matter.
 *
 * You can call defer many times to register many
 * defered functions that will all be called when
 * the function exits in any state.
 */
export const defer = async <TResponse>(
  func: (
    register: (
      fn: (error?: any) => any,
      options?: { rethrow?: boolean }
    ) => void
  ) => Promise<TResponse>
): Promise<TResponse> => {
  const callbacks: {
    fn: (error?: any) => any
    rethrow: boolean
  }[] = []
  const register = (
    fn: (error?: any) => any,
    options?: { rethrow?: boolean }
  ) =>
    callbacks.push({
      fn,
      rethrow: options?.rethrow ?? false
    })
  const [err, response] = await tryit(func)(register)
  for (const { fn, rethrow } of callbacks) {
    const [rethrown] = await tryit(fn)(err)
    if (rethrown && rethrow) throw rethrown
  }
  if (err) throw err
  return response
}

type WorkItemResult<K> = {
  index: number
  result: K
  error: any
}

/**
 * Support for the built-in AggregateError
 * is still new. Node < 15 doesn't have it
 * so patching here.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError#browser_compatibility
 */
export class AggregateError extends Error {
  errors: Error[]
  constructor(errors: Error[] = []) {
    super()
    const name = errors.find(e => e.name)?.name ?? ''
    this.name = `AggregateError(${name}...)`
    this.message = `AggregateError with ${errors.length} errors`
    this.stack = errors.find(e => e.stack)?.stack ?? this.stack
    this.errors = errors
  }
}

/**
 * Executes many async functions in parallel. Returns the
 * results from all functions as an array. After all functions
 * have resolved, if any errors were thrown, they are rethrown
 * in an instance of AggregateError
 */
export const parallel = async <T, K>(
  limit: number,
  array: readonly T[],
  func: (item: T) => Promise<K>
): Promise<K[]> => {
  const work = array.map((item, index) => ({
    index,
    item
  }))
  // Process array items
  const processor = async (res: (value: WorkItemResult<K>[]) => void) => {
    const results: WorkItemResult<K>[] = []
    while (true) {
      const next = work.pop()
      if (!next) return res(results)
      const [error, result] = await tryit(func)(next.item)
      results.push({
        error,
        result: result as K,
        index: next.index
      })
    }
  }
  // Create queues
  const queues = list(1, limit).map(() => new Promise(processor))
  // Wait for all queues to complete
  const itemResults = (await Promise.all(queues)) as WorkItemResult<K>[][]
  const [errors, results] = fork(
    sort(itemResults.flat(), r => r.index),
    x => !!x.error
  )
  if (errors.length > 0) {
    throw new AggregateError(errors.map(error => error.error))
  }
  return results.map(r => r.result)
}

type PromiseValues<T extends Promise<any>[]> = {
  [K in keyof T]: T[K] extends Promise<infer U> ? U : never
}

/**
 * Functionally similar to Promise.all or Promise.allSettled. If any
 * errors are thrown, all errors are gathered and thrown in an
 * AggregateError.
 *
 * @example
 * const [user] = await all([
 *   api.users.create(...),
 *   s3.buckets.create(...),
 *   slack.customerSuccessChannel.sendMessage(...)
 * ])
 */
export async function all<T extends Promise<any>[]>(
  promises: T
): Promise<PromiseValues<T>>
/**
 * Functionally similar to Promise.all or Promise.allSettled. If any
 * errors are thrown, all errors are gathered and thrown in an
 * AggregateError.
 *
 * @example
 * const { user } = await all({
 *   user: api.users.create(...),
 *   bucket: s3.buckets.create(...),
 *   message: slack.customerSuccessChannel.sendMessage(...)
 * })
 */
export async function all<T extends Record<string, Promise<any>>>(
  promises: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }>
export async function all<
  T extends Record<string, Promise<any>> | Promise<any>[]
>(promises: T) {
  const entries = isArray(promises)
    ? promises.map(p => [null, p] as [null, Promise<any>])
    : Object.entries(promises)

  const results = await Promise.all(
    entries.map(([key, value]) =>
      value
        .then(result => ({ result, exc: null, key }))
        .catch(exc => ({ result: null, exc, key }))
    )
  )

  const exceptions = results.filter(r => r.exc)
  if (exceptions.length > 0) {
    throw new AggregateError(exceptions.map(e => e.exc))
  }

  if (isArray(promises)) {
    return results.map(r => r.result) as T extends Promise<any>[]
      ? PromiseValues<T>
      : unknown
  }

  return results.reduce(
    (acc, item) => ({
      ...acc,
      [item.key!]: item.result
    }),
    {} as { [K in keyof T]: Awaited<T[K]> }
  )
}

/**
 * Retries the given function the specified number
 * of times.
 */
export const retry = async <TResponse>(
  options: {
    times?: number
    delay?: number | null
    backoff?: (count: number) => number
  },
  func: (exit: (err: any) => void) => Promise<TResponse>
): Promise<TResponse> => {
  const times = options?.times ?? 3
  const delay = options?.delay
  const backoff = options?.backoff ?? null
  for (const i of range(1, times)) {
    const [err, result] = (await tryit(func)((err: any) => {
      throw { _exited: err }
    })) as [any, TResponse]
    if (!err) return result
    if (err._exited) throw err._exited
    if (i === times) throw err
    if (delay) await sleep(delay)
    if (backoff) await sleep(backoff(i))
  }
  // Logically, we should never reach this
  // code path. It makes the function meet
  // strict mode requirements.
  /* istanbul ignore next */
  return undefined as unknown as TResponse
}

/**
 * Async wait
 */
export const sleep = (milliseconds: number) => {
  return new Promise(res => setTimeout(res, milliseconds))
}

/**
 * A helper to try an async function without forking
 * the control flow. Returns an error first callback _like_
 * array response as [Error, result]
 */
export const tryit = <Args extends any[], Return>(
  func: (...args: Args) => Return
) => {
  return async (
    ...args: Args
  ): Promise<[Error, undefined] | [undefined, Awaited<Return>]> => {
    try {
      return [undefined, await func(...args)]
    } catch (err) {
      return [err as any, undefined]
    }
  }
}

/**
 * A helper to try an async function that returns undefined
 * if it fails.
 *
 * e.g. const result = await guard(fetchUsers)() ?? [];
 */
export const guard = <TFunction extends () => any>(
  func: TFunction,
  shouldGuard?: (err: any) => boolean
): ReturnType<TFunction> extends Promise<any>
  ? Promise<Awaited<ReturnType<TFunction>> | undefined>
  : ReturnType<TFunction> | undefined => {
  const _guard = (err: any) => {
    if (shouldGuard && !shouldGuard(err)) throw err
    return undefined as any
  }
  const isPromise = (result: any): result is Promise<any> =>
    result instanceof Promise
  try {
    const result = func()
    return isPromise(result) ? result.catch(_guard) : result
  } catch (err) {
    return _guard(err)
  }
}
