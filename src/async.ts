
export const reduce = async <T, K> (
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
    value = await asyncReducer(value, item);
  }
  return value
}

export const map = async <T, K> (
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
export const defer = async <
  TResponse
>(
  func: (register: (fn: (error?: any) => void) => void) => Promise<TResponse>
): Promise<TResponse> => {
  let funcs: Function[] = []
  try {
    const result = await func(funcs.push.bind(funcs))
    for (const f of funcs) f()
    return result as TResponse
  } catch (err) {
    for (const f of funcs) f(err)
    throw err
  }
}

/**
 * Simple retry
 * 
 * Ex.
 * ```
 * await _.async.retry(async (exit) => {
 *   const { error, result } = await api.users.list()
 *   if (error.reason === 'UNAUTHORIZED') {
 *     exit('Not Authenticated)
 *   }
 *   return result
 * })()
 *
 * const listUsers = _.async.retry(async (exit, args) => {
 *   const { result } = await api.users.list(args)
 *   return result
 * })
 * await listUsers({ page: 2, limit: 200 })
 * ```
 */
export const retry = async <
  TResponse
> (
  func: (exit: (err: any) => void) => Promise<TResponse>,
  retries: number = 3,
  delay: number | null = 100
): Promise<TResponse> => {
  for (let i = 1; i <= retries; i++) {
    try {
      return await func((err: any) => {
        throw { _exited: err }
      })
    } catch (err) {
      if (err._exited) throw err._exited
      if (i === retries) throw err
    }
    if (delay) {
      await sleep(delay)
    }
  }
}

export const sleep = (milliseconds: number) => {
  return new Promise(res => setTimeout(res, milliseconds))
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
