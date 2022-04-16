
export const asyncReduce = <T, K> (array: T[]) => async (
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

// Javascript not handling types correctly on the
// original reduce func because of the func => func => result
export const asyncReduceV2 = async <T, K> (
  array: T[],
  asyncReducer: (acc: K, item: T) => Promise<K>, 
  initValue?: K
): Promise<K> => {
  return await asyncReduce(array)(asyncReducer, initValue) as K
}

export const asyncMap = <T, K> (array: T[]) => async (
  asyncMapFunc: (item: T) => Promise<K>
): Promise<K[]> => {
  let result = []
  for (const value of array) {
    const newValue = await asyncMapFunc(value)
    result.push(newValue)
  }
  return result
}

// Javascript not handling types correctly on the
// original map func because of the func => func => result
export const asyncMapV2 = async <T, K> (
  array: T[],
  asyncMapFunc: (item: T) => Promise<K>
): Promise<K[]> => {
  return await asyncMap(array)(asyncMapFunc) as K[]
}