

/**
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 * @param {Array<any>} array A list that has items you would like to sort into groups
 * @param {function} getGropuId A function that takes each item as an argument and returns an identifier for the group it should be placed in
 * @return object<any, any>
 */
export const group = (array, getGropuId) => {
  return array.reduce((acc, item) => {
    const groupId = getGropuId(item)
    const groupList = acc[groupId] ?? []
    return { ...acc, [groupId]: [...groupList, item ]}
  }, {})
}

export const boil = (array, compareFunc) => array.reduce(compareFunc)
export const sum = (array, fn) => (array || []).reduce((acc, item) => acc + fn(item), 0)
export const sort = (array, sortKeyFn) => array ? [...array].sort((a, b) => sortKeyFn(b) - sortKeyFn(a)) : []
export const first = (array) => array?.length > 0 ? array[0] : null
export const last = (array) => array?.length > 0 ? array[array.length - 1] : null

export const replace = (array, index, item) => {
  const copy = [...array]
  if (index >= copy.length) return copy
  copy[index] = item
  return copy
}

export const groupReduce = (reducers, initalValue = {}) => {
  
  const run = (accumulator, item) => reducers.reduce((acc, reducer) => {
    const [value, memo] = reducer(acc.value, acc.memo, item)
    return {
      value: { ...acc.value, ...value },
      memo: { ...acc.memo, ...memo }
    }
  }, accumulator)

  return (array) => {
    const { value } = array.reduce(run, { value: initalValue, memo: {} })
    return value
  }

}
