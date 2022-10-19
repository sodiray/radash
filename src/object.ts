import { isFunction, isObject } from './typed'

type LowercasedKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Lowercase<P>]: T[P]
}

type UppercasedKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Uppercase<P>]: T[P]
}

/**
 * Removes (shakes out) undefined entries from an
 * object. Optional second argument shakes out values
 * by custom evaluation.
 */
export const shake = <RemovedKeys extends string, T>(
  obj: T,
  filter: (value: any) => boolean = x => x === undefined
): Omit<T, RemovedKeys> => {
  if (!obj) return {} as T
  return Object.keys(obj).reduce((acc, key) => {
    if (filter(obj[key])) {
      return acc
    } else return { ...acc, [key]: obj[key] }
  }, {} as T)
}

/**
 * Map over all the keys of an object to return
 * a new object
 */
export const mapKeys = <
  TValue,
  TKey extends string | number | symbol,
  TNewKey extends string | number | symbol
>(
  obj: Record<TKey, TValue>,
  mapFunc: (key: TKey, value: TValue) => TNewKey
): Record<TNewKey, TValue> => {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      [mapFunc(key as TKey, obj[key])]: obj[key]
    }),
    {} as Record<TNewKey, TValue>
  )
}

/**
 * Map over all the keys to create a new object
 */
export const mapValues = <
  TValue,
  TKey extends string | number | symbol,
  TNewValue
>(
  obj: Record<TKey, TValue>,
  mapFunc: (value: TValue, key: string) => TNewValue
): Record<TKey, TNewValue> => {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      [key]: mapFunc(obj[key], key)
    }),
    {} as Record<TKey, TNewValue>
  )
}

/**
 * Map over all the keys to create a new object
 */
export const mapEntries = <
  TKey extends string | number | symbol,
  TValue,
  TNewKey extends string | number | symbol,
  TNewValue
>(
  obj: Record<TKey, TValue>,
  toEntry: (key: TKey, value: TValue) => [TNewKey, TNewValue]
): Record<TNewKey, TNewValue> => {
  if (!obj) return {} as Record<TNewKey, TNewValue>
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const [newKey, newValue] = toEntry(key as TKey, value as TValue)
    return {
      ...acc,
      [newKey]: newValue
    }
  }, {} as Record<TNewKey, TNewValue>)
}

/**
 * Returns an object with { [keys]: value }
 * inverted as { [value]: key }
 */
export const invert = <
  TKey extends string | number | symbol,
  TValue extends string | number | symbol
>(
  obj: Record<TKey, TValue>
): Record<TValue, TKey> => {
  if (!obj) return {} as Record<TValue, TKey>
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      [obj[key]]: key
    }),
    {} as Record<TValue, TKey>
  )
}

/**
 * Convert all keys in an object to lower case
 */
export const lowerize = <T extends Record<string, any>>(obj: T) =>
  mapKeys(obj, k => k.toLowerCase()) as LowercasedKeys<T>

/**
 * Convert all keys in an object to upper case
 */
export const upperize = <T extends Record<string, any>>(obj: T) =>
  mapKeys(obj, k => k.toUpperCase()) as UppercasedKeys<T>

export const clone = <T extends object = object>(obj: T): T => {
  return Object.getOwnPropertyNames(obj).reduce(
    (acc, name) => ({
      ...acc,
      [name]: obj[name]
    }),
    {} as T
  )
}

/**
 * Convert an object to a list, mapping each entry
 * into a list item
 */
export const listify = <TValue, TKey extends string | number | symbol, KResult>(
  obj: Record<TKey, TValue>,
  toItem: (key: TKey, value: TValue) => KResult
) => {
  if (!obj) return []
  const entries = Object.entries(obj)
  if (entries.length === 0) return []
  return entries.reduce((acc, entry) => {
    return [...acc, toItem(entry[0] as TKey, entry[1] as TValue)]
  }, [] as KResult[])
}

/**
 * Pick a list of properties from an object
 * into a new object
 */
export const pick = <T, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[]
): Pick<T, TKeys> => {
  if (!obj) return {} as Pick<T, TKeys>
  return keys.reduce((acc, key) => {
    if(typeof(obj[key]) !== 'undefined')
      acc[key] = obj[key]
    return acc;
  }, {} as Pick<T, TKeys>)
}

/**
 * Omit a list of properties from an object
 * returning a new object with the properties
 * that remain
 */
export const omit = <T, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[]
): Omit<T, TKeys> => {
  if (!obj) return {} as Omit<T, TKeys>
  if (!keys || keys.length === 0) return obj as Omit<T, TKeys>
  return keys.reduce(
    (acc, key) => {
      // Gross, I know, it's mutating the object, but we
      // are allowing it in this very limited scope due
      // to the performance implications of an omit func.
      // Not a pattern or practice to use elsewhere.
      delete acc[key]
      return acc
    },
    { ...obj }
  )
}

/**
 * Warning: Passing a function has been @deprecated
 * and will be removed in the next major version.
 */
export const get = <T, K>(
  value: T,
  funcOrPath: ((t: T) => K) | string,
  defaultValue: K | null = null
): K => {
  if (isFunction(funcOrPath)) {
    try {
      return (funcOrPath as Function)(value) ?? defaultValue
    } catch {
      return defaultValue
    }
  }
  const segments = (funcOrPath as string).split(/[\.\[\]]/g)
  let current: any = value
  for (const key of segments) {
    if (current === null) return defaultValue
    if (current === undefined) return defaultValue
    if (key.trim() === '') continue
    current = current[key]
  }
  if (current === undefined) return defaultValue
  return current
}

/**
 * Zip two objects together recursivly into a new
 * object applying values from right to left.
 * Recursion only applies to child object properties.
 */
export const zip = <X extends Record<string | symbol | number, any>>(
  a: X,
  b: X
): X => {
  if (!a && !b) return {} as X
  if (!a) return b as X
  if (!b) return a as X
  return Object.entries(a).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: (() => {
        if (isObject(value)) return zip(value, b[key])
        return b[key]
      })()
    }
  }, {} as X)
}
