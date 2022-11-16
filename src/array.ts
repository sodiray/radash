/**
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 */
export const group = <T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T) => Key
) => {
  return array.reduce((acc, item) => {
    const groupId = getGroupId(item)
    const groupList = acc[groupId] ?? []
    return { ...acc, [groupId]: [...groupList, item] }
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
 */
export function zipToObject<K extends string | number | symbol, V>(
  keys: K[],
  values: V[]
): Record<K, V> {
  if (!keys || !keys.length || !values || values.length)
    return {} as Record<K, V>
  return keys.reduce(
    (acc, key, idx) => ({ ...acc, [key]: values[idx] }),
    {} as Record<K, V>
  )
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
export const sum = <T extends number | object>(
  array: readonly T[],
  fn?: (item: T) => number
) => {
  return (array || []).reduce(
    (acc, item) => acc + (fn ? fn(item) : (item as number)),
    0
  )
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
  return list.reduce((acc, item) => {
    const id = identity(item)
    return {
      ...acc,
      [id]: (acc[id] ?? 0) + 1
    }
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
  if (!newItem) return [...list]
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
  return array.reduce(
    (acc, item) => ({
      ...acc,
      [getKey(item)]: getValue(item)
    }),
    {} as Record<Key, Value>
  )
}

/**
 * Select performs a filter and a mapper inside of a reduce,
 * only iterating the list one time.
 *
 * Ex. select([1, 2, 3, 4], x => x*x, x > 2) == [9, 16]
 */
export const select = <T, K>(
  array: readonly T[],
  mapper: (item: T) => K,
  condition: (item: T) => boolean
) => {
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
export const max = <T extends number | object>(
  array: readonly T[],
  getter?: (item: T) => number
) => {
  const get = getter ? getter : (v: any) => v
  return boil(array, (a, b) => (get(a) > get(b) ? a : b))
}

/**
 * Min gets the smallest value from a list
 *
 * Ex. max([{ num: 1 }, { num: 2 }], x => x.num) == 1
 */
export const min = <T extends number | object>(
  array: readonly T[],
  getter?: (item: T) => number
) => {
  const get = getter ? getter : (v: any) => v
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
    return { ...acc, [key]: item }
  }, {} as Record<string | number | symbol, T>)
  return Object.values(valueMap)
}

/**
 * Creates a generator that will produce an iteration through
 * the range of number as requested.
 *
 * @example for (const i of _.range(3, 3*3, 3)) { console.log(i) }
 */
export function* range(
  start: number,
  end: number,
  step: number = 1
): Generator<number> {
  for (let i = start; i <= end; i += step) {
    yield i
    if (i + step > end) break
  }
}

/**
 * Creates a list with numbers ranging from the
 * start to the end by the given step.
 *
 * @example list(0, 3) // [0, 1, 2, 3]
 * @example list(2, 10, 2) // [2, 4, 6, 8 ,10]
 */
export const list = (
  start: number,
  end: number,
  step: number = 1
): number[] => {
  return Array.from(range(start, end, step))
}

/**
 * Given an array of arrays, returns a single
 * dimentional array with all items in it.
 */
export const flat = <T>(lists: readonly T[][]): T[] => {
  return lists.reduce((acc, list) => {
    return [...acc, ...list]
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
  const dictB = listB.reduce(
    (acc, item) => ({
      ...acc,
      [ident(item)]: true
    }),
    {} as Record<string | number | symbol, boolean>
  )
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
    if (matched) return [...acc, matched]
    else return [...acc, r]
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

/**
 * Given a list returns a new list with
 * only truthy values
 */
export const sift = <T>(list: readonly T[]): NonNullable<T>[] => {
  return (list?.filter(x => !!x) as NonNullable<T>[]) ?? []
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
  const bKeys = other.reduce(
    (acc, item) => ({
      ...acc,
      [identity(item)]: true
    }),
    {} as Record<string | number | symbol, boolean>
  )
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
