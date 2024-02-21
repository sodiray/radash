import { isArray, isFunction } from './typed'

/**
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 */
export const group = <T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T) => Key
): Partial<Record<Key, T[]>> => {
  return array.reduce((acc, item) => {
    const groupId = getGroupId(item)
    if (!acc[groupId]) acc[groupId] = []
    acc[groupId].push(item)
    return acc
  }, {} as Record<Key, T[]>)
}

/**
 * Creates an array of grouped elements, the first of which contains the
 * first elements of the given arrays, the second of which contains the
 * second elements of the given arrays, and so on.
 *
 * Ex. const zipped = zip(['a', 'b'], [1, 2], [true, false]) // [['a', 1, true], ['b', 2, false]]
 */
export function zip<T1, T2, T3, T4, T5>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[],
  array5: T5[]
): [T1, T2, T3, T4, T5][]
export function zip<T1, T2, T3, T4>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[]
): [T1, T2, T3, T4][]
export function zip<T1, T2, T3>(
  array1: T1[],
  array2: T2[],
  array3: T3[]
): [T1, T2, T3][]
export function zip<T1, T2>(array1: T1[], array2: T2[]): [T1, T2][]
export function zip<T>(...arrays: T[][]): T[][] {
  if (!arrays || !arrays.length) return []
  return new Array(Math.max(...arrays.map(({ length }) => length)))
    .fill([])
    .map((_, idx) => arrays.map(array => array[idx]))
}

/**
 * Creates an object mapping the specified keys to their corresponding values
 *
 * Ex. const zipped = zipToObject(['a', 'b'], [1, 2]) // { a: 1, b: 2 }
 * Ex. const zipped = zipToObject(['a', 'b'], (k, i) => k + i) // { a: 'a0', b: 'b1' }
 * Ex. const zipped = zipToObject(['a', 'b'], 1) // { a: 1, b: 1 }
 */
export function zipToObject<K extends string | number | symbol, V>(
  keys: K[],
  values: V | ((key: K, idx: number) => V) | V[]
): Record<K, V> {
  if (!keys || !keys.length) {
    return {} as Record<K, V>
  }

  const getValue = isFunction(values)
    ? values
    : isArray(values)
    ? (_k: K, i: number) => values[i]
    : (_k: K, _i: number) => values

  return keys.reduce((acc, key, idx) => {
    acc[key] = getValue(key, idx)
    return acc
  }, {} as Record<K, V>)
}

/**
 * Go through a list of items, starting with the first item,
 * and comparing with the second. Keep the one you want then
 * compare that to the next item in the list with the same
 *
 * Ex. const greatest = () => boil(numbers, (a, b) => a > b)
 */
export const boil = <T>(
  array: readonly T[],
  compareFunc: (a: T, b: T) => T
) => {
  if (!array || (array.length ?? 0) === 0) return null
  return array.reduce(compareFunc)
}

/**
 * Sum all numbers in an array. Optionally provide a function
 * to convert objects in the array to number values.
 */
export function sum<T extends number>(array: readonly T[]): number
export function sum<T extends object>(
  array: readonly T[],
  fn: (item: T) => number
): number
export function sum<T extends object | number>(
  array: readonly any[],
  fn?: (item: T) => number
): number {
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item), 0)
}

/**
 * Get the first item in an array or a default value
 */
export const first = <T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) => {
  return array?.length > 0 ? array[0] : defaultValue
}

/**
 * Get the last item in an array or a default value
 */
export const last = <T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) => {
  return array?.length > 0 ? array[array.length - 1] : defaultValue
}

/**
 * Sort an array without modifying it and return
 * the newly sorted value
 */
export const sort = <T>(
  array: readonly T[],
  getter: (item: T) => number,
  desc = false
) => {
  if (!array) return []
  const asc = (a: T, b: T) => getter(a) - getter(b)
  const dsc = (a: T, b: T) => getter(b) - getter(a)
  return array.slice().sort(desc === true ? dsc : asc)
}

/**
 * Sort an array without modifying it and return
 * the newly sorted value. Allows for a string
 * sorting value.
 */
export const alphabetical = <T>(
  array: readonly T[],
  getter: (item: T) => string,
  dir: 'asc' | 'desc' = 'asc'
) => {
  if (!array) return []
  const asc = (a: T, b: T) => `${getter(a)}`.localeCompare(getter(b))
  const dsc = (a: T, b: T) => `${getter(b)}`.localeCompare(getter(a))
  return array.slice().sort(dir === 'desc' ? dsc : asc)
}

export const counting = <T, TId extends string | number | symbol>(
  list: readonly T[],
  identity: (item: T) => TId
): Record<TId, number> => {
  if (!list) return {} as Record<TId, number>
  return list.reduce((acc, item) => {
    const id = identity(item)
    acc[id] = (acc[id] ?? 0) + 1
    return acc
  }, {} as Record<TId, number>)
}

/**
 * Replace an element in an array with a new
 * item without modifying the array and return
 * the new value
 */
export const replace = <T>(
  list: readonly T[],
  newItem: T,
  match: (item: T, idx: number) => boolean
): T[] => {
  if (!list) return []
  if (newItem === undefined) return [...list]
  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx]
    if (match(item, idx)) {
      return [
        ...list.slice(0, idx),
        newItem,
        ...list.slice(idx + 1, list.length)
      ]
    }
  }
  return [...list]
}

/**
 * Convert an array to a dictionary by mapping each item
 * into a dictionary key & value
 */
export const objectify = <T, Key extends string | number | symbol, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = item => item as unknown as Value
): Record<Key, Value> => {
  return array.reduce((acc, item) => {
    acc[getKey(item)] = getValue(item)
    return acc
  }, {} as Record<Key, Value>)
}

/**
 * Select performs a filter and a mapper inside of a reduce,
 * only iterating the list one time.
 *
 * @example
 * select([1, 2, 3, 4], x => x*x, x > 2) == [9, 16]
 */
export const select = <T, K>(
  array: readonly T[],
  mapper: (item: T, index: number) => K,
  condition: (item: T, index: number) => boolean
) => {
  if (!array) return []
  return array.reduce((acc, item, index) => {
    if (!condition(item, index)) return acc
    acc.push(mapper(item, index))
    return acc
  }, [] as K[])
}

/**
 * Max gets the greatest value from a list
 *
 * @example
 * max([ 2, 3, 5]) == 5
 * max([{ num: 1 }, { num: 2 }], x => x.num) == { num: 2 }
 */
export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | null
export function max<T>(
  array: readonly T[],
  getter: (item: T) => number
): T | null
export function max<T>(
  array: readonly T[],
  getter?: (item: T) => number
): T | null {
  const get = getter ?? ((v: any) => v)
  return boil(array, (a, b) => (get(a) > get(b) ? a : b))
}

/**
 * Min gets the smallest value from a list
 *
 * @example
 * min([1, 2, 3, 4]) == 1
 * min([{ num: 1 }, { num: 2 }], x => x.num) == { num: 1 }
 */
export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | null
export function min<T>(
  array: readonly T[],
  getter: (item: T) => number
): T | null
export function min<T>(
  array: readonly T[],
  getter?: (item: T) => number
): T | null {
  const get = getter ?? ((v: any) => v)
  return boil(array, (a, b) => (get(a) < get(b) ? a : b))
}

/**
 * Splits a single list into many lists of the desired size. If
 * given a list of 10 items and a size of 2, it will return 5
 * lists with 2 items each
 */
export const cluster = <T>(list: readonly T[], size: number = 2): T[][] => {
  const clusterCount = Math.ceil(list.length / size)
  return new Array(clusterCount).fill(null).map((_c: null, i: number) => {
    return list.slice(i * size, i * size + size)
  })
}

/**
 * Given a list of items returns a new list with only
 * unique items. Accepts an optional identity function
 * to convert each item in the list to a comparable identity
 * value
 */
export const unique = <T, K extends string | number | symbol>(
  array: readonly T[],
  toKey?: (item: T) => K
): T[] => {
  const valueMap = array.reduce((acc, item) => {
    const key = toKey ? toKey(item) : (item as any as string | number | symbol)
    if (acc[key]) return acc
    acc[key] = item
    return acc
  }, {} as Record<string | number | symbol, T>)
  return Object.values(valueMap)
}

/**
 * Creates a generator that will produce an iteration through
 * the range of number as requested.
 *
 * @example
 * range(3)                  // yields 0, 1, 2, 3
 * range(0, 3)               // yields 0, 1, 2, 3
 * range(0, 3, 'y')          // yields y, y, y, y
 * range(0, 3, () => 'y')    // yields y, y, y, y
 * range(0, 3, i => i)       // yields 0, 1, 2, 3
 * range(0, 3, i => `y${i}`) // yields y0, y1, y2, y3
 * range(0, 3, obj)          // yields obj, obj, obj, obj
 * range(0, 6, i => i, 2)    // yields 0, 2, 4, 6
 */
export function* range<T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper: T | ((i: number) => T) = i => i as T,
  step: number = 1
): Generator<T> {
  const mapper = isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper
  const start = end ? startOrLength : 0
  const final = end ?? startOrLength
  for (let i = start; i <= final; i += step) {
    yield mapper(i)
    if (i + step > final) break
  }
}

/**
 * Creates a list of given start, end, value, and
 * step parameters.
 *
 * @example
 * list(3)                  // 0, 1, 2, 3
 * list(0, 3)               // 0, 1, 2, 3
 * list(0, 3, 'y')          // y, y, y, y
 * list(0, 3, () => 'y')    // y, y, y, y
 * list(0, 3, i => i)       // 0, 1, 2, 3
 * list(0, 3, i => `y${i}`) // y0, y1, y2, y3
 * list(0, 3, obj)          // obj, obj, obj, obj
 * list(0, 6, i => i, 2)    // 0, 2, 4, 6
 */
export const list = <T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper?: T | ((i: number) => T),
  step?: number
): T[] => {
  return Array.from(range(startOrLength, end, valueOrMapper, step))
}

/**
 * Given an array of arrays, returns a single
 * dimentional array with all items in it.
 */
export const flat = <T>(lists: readonly T[][]): T[] => {
  return lists.reduce((acc, list) => {
    acc.push(...list)
    return acc
  }, [])
}

/**
 * Given two arrays, returns true if any
 * elements intersect
 */
export const intersects = <T, K extends string | number | symbol>(
  listA: readonly T[],
  listB: readonly T[],
  identity?: (t: T) => K
): boolean => {
  if (!listA || !listB) return false
  const ident = identity ?? ((x: T) => x as unknown as K)
  const dictB = listB.reduce((acc, item) => {
    acc[ident(item)] = true
    return acc
  }, {} as Record<string | number | symbol, boolean>)
  return listA.some(value => dictB[ident(value)])
}

/**
 * Split an array into two array based on
 * a true/false condition function
 */
export const fork = <T>(
  list: readonly T[],
  condition: (item: T) => boolean
): [T[], T[]] => {
  if (!list) return [[], []]
  return list.reduce(
    (acc, item) => {
      const [a, b] = acc
      if (condition(item)) {
        return [[...a, item], b]
      } else {
        return [a, [...b, item]]
      }
    },
    [[], []] as [T[], T[]]
  )
}

/**
 * Given two lists of the same type, iterate the first list
 * and replace items matched by the matcher func in the
 * first place.
 */
export const merge = <T>(
  root: readonly T[],
  others: readonly T[],
  matcher: (item: T) => any
) => {
  if (!others && !root) return []
  if (!others) return root
  if (!root) return []
  if (!matcher) return root
  return root.reduce((acc, r) => {
    const matched = others.find(o => matcher(r) === matcher(o))
    if (matched) acc.push(matched)
    else acc.push(r)
    return acc
  }, [] as T[])
}

/**
 * Replace an item in an array by a match function condition. If
 * no items match the function condition, appends the new item to
 * the end of the list.
 */
export const replaceOrAppend = <T>(
  list: readonly T[],
  newItem: T,
  match: (a: T, idx: number) => boolean
) => {
  if (!list && !newItem) return []
  if (!newItem) return [...list]
  if (!list) return [newItem]
  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx]
    if (match(item, idx)) {
      return [
        ...list.slice(0, idx),
        newItem,
        ...list.slice(idx + 1, list.length)
      ]
    }
  }
  return [...list, newItem]
}

/**
 * If the item matching the condition already exists
 * in the list it will be removed. If it does not it
 * will be added.
 */
export const toggle = <T>(
  list: readonly T[],
  item: T,
  /**
   * Converts an item of type T item into a value that
   * can be checked for equality
   */
  toKey?: null | ((item: T, idx: number) => number | string | symbol),
  options?: {
    strategy?: 'prepend' | 'append'
  }
) => {
  if (!list && !item) return []
  if (!list) return [item]
  if (!item) return [...list]
  const matcher = toKey
    ? (x: T, idx: number) => toKey(x, idx) === toKey(item, idx)
    : (x: T) => x === item
  const existing = list.find(matcher)
  if (existing) return list.filter((x, idx) => !matcher(x, idx))
  const strategy = options?.strategy ?? 'append'
  if (strategy === 'append') return [...list, item]
  return [item, ...list]
}

type Falsy = null | undefined | false | '' | 0 | 0n

/**
 * Given a list returns a new list with
 * only truthy values
 */
export const sift = <T>(list: readonly (T | Falsy)[]): T[] => {
  return (list?.filter(x => !!x) as T[]) ?? []
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

/**
 * Returns all items from the first list that
 * do not exist in the second list.
 */
export const diff = <T>(
  root: readonly T[],
  other: readonly T[],
  identity: (item: T) => string | number | symbol = (t: T) =>
    t as unknown as string | number | symbol
): T[] => {
  if (!root?.length && !other?.length) return []
  if (root?.length === undefined) return [...other]
  if (!other?.length) return [...root]
  const bKeys = other.reduce((acc, item) => {
    acc[identity(item)] = true
    return acc
  }, {} as Record<string | number | symbol, boolean>)
  return root.filter(a => !bKeys[identity(a)])
}

/**
 * Shift array items by n steps
 * If n > 0 items will shift n steps to the right
 * If n < 0 items will shift n steps to the left
 */
export function shift<T>(arr: Array<T>, n: number) {
  if (arr.length === 0) return arr

  const shiftNumber = n % arr.length

  if (shiftNumber === 0) return arr

  return [...arr.slice(-shiftNumber, arr.length), ...arr.slice(0, -shiftNumber)]
}
