import { fork, list, sort } from './array'

/**
 * An async reduce function. Works like the
 * built-in Array.reduce function but handles
 * an async reducer function
 */
export const reduce = async <T, K>(
  array: T[],
  asyncReducer: (acc: K, item: T) => Promise<K>,
  initValue?: K
): Promise<K> => {
  const initProvided = initValue !== undefined
  if (!initProvided && array?.length < 1) {
    throw new Error('Cannot reduce empty array with no init value')
  }
  const iter = initProvided ? array : array.slice(1)
  let value: any = initProvided ? initValue : array[0]
  for (const item of iter) {
    value = await asyncReducer(value, item)
  }
  return value
}

/**
 * An async map function. Works like the
 * built-in Array.map function but handles
 * an async mapper function
 */
export const map = async <T, K>(
  array: T[],
  asyncMapFunc: (item: T) => Promise<K>
): Promise<K[]> => {
  let result = []
  for (const value of array) {
    const newValue = await asyncMapFunc(value)
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
    if (rethrow) throw rethrown
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
 * is still new. Node <= 14 doesn't have it
 * so patching here.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError#browser_compatibility
 */
export class AggregateError extends Error {
  errors: Error[]
  constructor(errors: Error[]) {
    super()
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
  array: T[],
  func: (item: T) => Promise<K>,
  limit: number = array.length
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
        result,
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
  for (const i of list(1, times)) {
    const [err, result] = (await tryit(func)((err: any) => {
      throw { _exited: err }
    })) as [any, TResponse]
    if (!err) return result
    if (err._exited) throw err._exited
    if (i === times) throw err
    if (delay) await sleep(delay)
    if (backoff) await sleep(backoff(i))
  }
}

/**
 * Async wait
 */
export const sleep = (milliseconds: number) => {
  return new Promise(res => setTimeout(res, milliseconds))
}

type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never
type UnwrapPromisify<T> = T extends Promise<infer U> ? U : T

/**
 * A helper to try an async function without forking
 * the control flow. Returns an error first callback _like_
 * array response as [Error, result]
 */
export const tryit = <TFunction extends (...args: any) => any>(
  func: TFunction
) => {
  return async (
    ...args: ArgumentsType<TFunction>
  ): Promise<[Error, UnwrapPromisify<ReturnType<TFunction>>]> => {
    try {
      return [null, await func(...(args as any))]
    } catch (err) {
      return [err as any, null]
    }
  }
}
