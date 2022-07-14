import { random } from './number'

/**
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 */
export const group = <T>(array: T[], getGropuId: (item: T) => string) => {
  return array.reduce((acc, item) => {
    const groupId = getGropuId(item)
    const groupList = acc[groupId] ?? []
    return { ...acc, [groupId]: [...groupList, item] }
  }, {} as Record<string, T[]>)
}

/**
 * Go through a list of items, starting with the first item,
 * and comparing with the second. Keep the one you want then
 * compare that to the next item in the list with the same
 * 
 * Ex. const greatest = () => boil(numbers, (a, b) => a > b)
 */
export const boil = <T>(array: T[], compareFunc: (a: T, b: T) => T) => {
  if (!array || (array.length ?? 0) === 0) return null
  return array.reduce(compareFunc)
}

/**
 * Sum all numbers in an array. Optionally provide a function
 * to convert objects in the array to number values.
 */
export const sum = <T extends number | object>(array: T[], fn?: (item: T) => number) => {
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item as number), 0)
}

/**
 * Get the first item in an array or a default value
 */
export const first = <T>(array: T[], defaultValue: T | null | undefined = undefined) => {
  return array?.length > 0 ? array[0] : defaultValue
}

/**
 * Get the last item in an array or a default value
 */
export const last = <T>(array: T[], defaultValue: T | null | undefined = undefined) => {
  return array?.length > 0 ? array[array.length - 1] : defaultValue
}

/**
 * Sort an array without modifying it and return
 * the newly sorted value
 */
export const sort = <T>(
  array: T[],
  getter: (item: T) => number,
  desc = false
) => {
  if (!array) return []
  const asc = (a: T, b: T) => getter(a) - getter(b)
  const dsc = (a: T, b: T) => getter(b) - getter(a)
  return array.slice().sort(desc === true ? dsc : asc)
}

/**
 * Replace an element in an array with a new
 * item without modifying the array and return
 * the new value
 */
export const replace = <T>(list: T[], newItem: T, match: (item: T, idx: number) => boolean): T[] => {
  if (!list) return []
  if (!newItem) return [...list]
  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx]
    if (match(item, idx)) {
      return [...list.slice(0, idx), newItem, ...list.slice(idx + 1, list.length)]
    }
  }
  return [...list]
}

/**
 * Convert an array to a dictionary by mapping each item
 * into a dictionary key & value 
 */
export const objectify = <T, Key extends string | number | symbol, Value>(array: T[], getKey: (item: T) => Key, getValue: (item: T) => Value): Record<Key, Value> => {
  return array.reduce((acc, item) => ({
    ...acc,
    [getKey(item)]: getValue(item)
  }), {} as Record<Key, Value>)
}

/**
 * Select performs a filter and a mapper inside of a reduce,
 * only iterating the list one time.
 * 
 * Ex. select([1, 2, 3, 4], x => x*x, x > 2) == [9, 16]
 */
export const select = <T, K>(array: T[], mapper: (item: T) => K, condition: (item: T) => boolean) => {
  return array.reduce((acc, item) => {
    if (!condition(item)) return acc
    return [...acc, mapper(item)]
  }, [] as K[])
}

/**
 * Max gets the greatest value from a list
 * 
 * Ex. max([{ num: 1 }, { num: 2 }], x => x.num) == 2
 */
export const max = <T extends number | object>(array: T[], getter?: (item: T) => number) => {
  const get = getter ? getter : (v: any) => v
  return boil(array, (a, b) => get(a) > get(b) ? a : b)
}

/**
 * Min gets the smallest value from a list
 * 
 * Ex. max([{ num: 1 }, { num: 2 }], x => x.num) == 1
 */
export const min = <T extends number | object>(array: T[], getter?: (item: T) => number) => {
  const get = getter ? getter : (v: any) => v
  return boil(array, (a, b) => get(a) < get(b) ? a : b)
}


export const cluster = <T>(list: T[], size: number = 2): T[][] => {
  const clusterCount = Math.ceil(list.length / size)
  return new Array(clusterCount).fill(null).map((_c: null, i: number) => {
    return list.slice(i * size, (i * size) + size)
  })
}

export const unique = <T, K extends string | number | symbol>(array: T[], toKey?: (item: T) => K): T[] => {
  const valueMap = array.reduce((acc, item) => {
    const key = toKey ? toKey(item) : (item as any as string | number | symbol)
    if (acc[key]) return acc
    return { ...acc, [key]: item }
  }, {} as Record<string | number | symbol, T>)
  return Object.values(valueMap)
}

export const shuffle = <T>(array: T[]): T[] => {
  return array
    .map((a) => ({ rand: Math.random(), value: a }))
    .sort((a, b) => a.rand - b.rand)
    .map((a) => a.value)
}

/**
 * Draw a random item from a list. Returns
 * null if the list is empty
 */
export const draw = <T>(array: T[]): T | null => {
  const max = array.length
  if (max === 0) {
    return null
  }
  const index = random(0, max - 1)
  return array[index]
}

/**
 * Creates a generator that will produce an iteration through
 * the range of number as requested.
 * 
 * @example for (const i of _.range(3, 3*3, 3)) { console.log(i) }
 */
 export function * range (start: number, end: number, step: number = 1): Generator<number> {
  const count = (end - start) / step
  for (let idx = start; idx <= count; idx++) {
    yield ((idx * step) + start)
  }
}

/**
 * Given an array of arrays, returns a single
 * dimentional array with all items in it.
 */
export const flat = <T>(lists: T[][]): T[] => {
  return lists.reduce((acc, list) => {
    return [...acc, ...list]
  }, [])
}

/**
 * Given two arrays, returns true if any
 * elements intersect
 */
export const intersects = <T, K extends string | number | symbol> (listA: T[], listB: T[], identity?: (t: T) => K): boolean => {
  if (!listA || !listB) return false
  const ident = identity ?? ((x: T) => x as unknown as K)
  const dictB = listB.reduce((acc, item) => ({ 
    ...acc, [ident(item)]: true 
  }), {} as Record<string | number | symbol, true>)
  return listA.some(value => dictB[ident(value)])
}

/**
 * Split an array into two array based on
 * a true/false condition function
 */
export const fork = <T> (list: T[], condition: (item: T) => boolean): [T[], T[]] => {
  if (!list) return [[], []]
  return list.reduce((acc, item) => {
    const [a, b] = acc
    if (condition(item)) {
      return [[...a, item], b]
    } else {
      return [a, [...b, item]]
    }
  }, [[], []] as [T[], T[]])
}

/**
 * Given two lists of the same type, iterate the first list
 * and replace items matched by the matcher func in the
 * first place.
 */
export const merge = <T> (root: T[], others: T[], matcher: (item: T) => any) => {
  if (!others && !root) return []
  if (!others) return root
  if (!root) return []
  if (!matcher) return root
  return root.reduce((acc, r) => {
    const matched = others.find(o => matcher(r) === matcher(o))
    if (matched) return [...acc, matched]
    else return [...acc, r]
  }, [])
}

/**
 * Replace an item in an array by a match function condition. If
 * no items match the function condition, appends the new item to
 * the end of the list.
 */
export const replaceOrAppend = <T> (list: T[], newItem: T, match: (a: T, idx: number) => boolean) => {
  if (!list && !newItem) return []
  if (!newItem) return [...list]
  if (!list) return [newItem]
  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx]
    if (match(item, idx)) {
      return [...list.slice(0, idx), newItem, ...list.slice(idx + 1, list.length)]
    }
  }
  return [...list, newItem]
}

export const sift = <T> (list: T[]) => {
  return list?.filter(x => !!x) ?? []
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
export const iterate = <T>(
  count: number, 
  func: (currentValue: T, iteration: number) => T, 
  initValue: T
) => {
  let value = initValue
  for (let i = 1; i <= count; i++) {
    value = func(value, i)
  }
  return value
}
