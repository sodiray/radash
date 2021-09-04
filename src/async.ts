
export const asyncReduce = <T, K> (array: T[]) => async (
  asyncReducer: (acc: K, item: T) => Promise<K>, 
  startingValue: K
): Promise<K> => {
  let result = startingValue
  for (const value of array) {
    result = await asyncReducer(result, value);
  }
  return result
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