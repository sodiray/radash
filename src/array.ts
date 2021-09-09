import { iter } from './curry'
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
export const first = <T>(array: T[], defaultValue: T | null | undefined = null) => {
  return array?.length > 0 ? array[0] : defaultValue
}

/**
 * Get the last item in an array or a default value
 */
export const last = <T>(array: T[], defaultValue: T | null | undefined = null) => {
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
export const replace = <T>(array: T[], index: number, item: T) => {
  const copy = array.slice()
  if (index >= copy.length) return copy
  copy[index] = item
  return copy
}

/**
 * Convert an array to a dictionary by mapping each item
 * into a dictionary key & value 
 */
export const dict = <T, K extends string | number | symbol>(array: T[], getId: (item: T) => K): Record<K, T> => {
  return array.reduce((acc, item) => ({
    ...acc,
    [getId(item)]: item
  }), {} as Record<K, T>)
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
  const min = 0
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
 * @example for (const i of _.range(3, 3*3, 3))
 */
export const range = (start: number, end: number, step: number = 1): number[] => {
  const itemCount = (end - start) / step
  return iter(itemCount, (list, idx) => {
    return [...list, ((idx * step) + start)]
  }, [start])
}
