import { objectify } from './array'
import { toInt } from './number'
import { isArray, isObject, isPrimitive } from './typed'

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
  const keys = Object.keys(obj) as (keyof T)[]
  return keys.reduce((acc, key) => {
    if (filter(obj[key])) {
      return acc
    } else {
      acc[key] = obj[key]
      return acc
    }
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
  const keys = Object.keys(obj) as TKey[]
  return keys.reduce((acc, key) => {
    acc[mapFunc(key as TKey, obj[key])] = obj[key]
    return acc
  }, {} as Record<TNewKey, TValue>)
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
  mapFunc: (value: TValue, key: TKey) => TNewValue
): Record<TKey, TNewValue> => {
  const keys = Object.keys(obj) as TKey[]
  return keys.reduce((acc, key) => {
    acc[key] = mapFunc(obj[key], key)
    return acc
  }, {} as Record<TKey, TNewValue>)
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
    acc[newKey] = newValue
    return acc
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
  const keys = Object.keys(obj) as TKey[]
  return keys.reduce((acc, key) => {
    acc[obj[key]] = key
    return acc
  }, {} as Record<TValue, TKey>)
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

/**
 * Creates a shallow copy of the given obejct/value.
 * @param {*} obj value to clone
 * @returns {*} shallow clone of the given value
 */
export const clone = <T>(obj: T): T => {
  // Primitive values do not need cloning.
  if (isPrimitive(obj)) {
    return obj
  }

  // Binding a function to an empty object creates a
  // copy function.
  if (typeof obj === 'function') {
    return obj.bind({})
  }

  // Access the constructor and create a new object.
  // This method can create an array as well.
  const newObj = new ((obj as object).constructor as { new (): T })()

  // Assign the props.
  Object.getOwnPropertyNames(obj).forEach(prop => {
    // Bypass type checking since the primitive cases
    // are already checked in the beginning
    ;(newObj as any)[prop] = (obj as any)[prop]
  })

  return newObj
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
    acc.push(toItem(entry[0] as TKey, entry[1] as TValue))
    return acc
  }, [] as KResult[])
}

/**
 * Pick a list of properties from an object
 * into a new object
 */
export const pick = <T extends object, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[]
): Pick<T, TKeys> => {
  if (!obj) return {} as Pick<T, TKeys>
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) acc[key] = obj[key]
    return acc
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
 * Dynamically get a nested value from an array or
 * object with a string.
 *
 * @example get(person, 'friends[0].name')
 */
export const get = <TDefault = unknown>(
  value: any,
  path: string,
  defaultValue?: TDefault
): TDefault => {
  const segments = path.split(/[\.\[\]]/g)
  let current: any = value
  for (const key of segments) {
    if (current === null) return defaultValue as TDefault
    if (current === undefined) return defaultValue as TDefault
    const dequoted = key.replace(/['"]/g, '')
    if (dequoted.trim() === '') continue
    current = current[dequoted]
  }
  if (current === undefined) return defaultValue as TDefault
  return current
}

/**
 * Opposite of get, dynamically set a nested value into
 * an object using a key path. Does not modify the given
 * initial object.
 *
 * @example
 * set({}, 'name', 'ra') // => { name: 'ra' }
 * set({}, 'cards[0].value', 2) // => { cards: [{ value: 2 }] }
 */
export const set = <T extends object, K>(
  initial: T,
  path: string,
  value: K
): T => {
  if (!initial) return {} as T
  if (!path || value === undefined) return initial
  const segments = path.split(/[\.\[\]]/g).filter(x => !!x.trim())
  const _set = (node: any) => {
    if (segments.length > 1) {
      const key = segments.shift() as string
      const nextIsNum = toInt(segments[0], null) === null ? false : true
      node[key] = node[key] === undefined ? (nextIsNum ? [] : {}) : node[key]
      _set(node[key])
    } else {
      node[segments[0]] = value
    }
  }
  // NOTE: One day, when structuredClone has more
  // compatability use it to clone the value
  // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
  const cloned = clone(initial)
  _set(cloned)
  return cloned
}

/**
 * Merges two objects together recursivly into a new
 * object applying values from right to left.
 * Recursion only applies to child object properties.
 */
export const assign = <X extends Record<string | symbol | number, any>>(
  initial: X,
  override: X
): X => {
  if (!initial || !override) return initial ?? override ?? {}

  const merged = { ...initial }

  for (const key in override) {
    if(override.hasOwnProperty(key)) {
      if(isObject(initial[key])) {
        merged[key] = assign(initial[key], override[key])
      }
      else {
        merged[key] = override[key]
      }
    }
  }

  return merged;
}

/**
 * Get a string list of all key names that exist in
 * an object (deep).
 *
 * @example
 * keys({ name: 'ra' }) // ['name']
 * keys({ name: 'ra', children: [{ name: 'hathor' }] }) // ['name', 'children.0.name']
 */
export const keys = <TValue extends object>(value: TValue): string[] => {
  if (!value) return []
  const getKeys = (nested: any, paths: string[]): string[] => {
    if (isObject(nested)) {
      return Object.entries(nested).flatMap(([k, v]) =>
        getKeys(v, [...paths, k])
      )
    }
    if (isArray(nested)) {
      return nested.flatMap((item, i) => getKeys(item, [...paths, `${i}`]))
    }
    return [paths.join('.')]
  }
  return getKeys(value, [])
}

/**
 * Flattens a deep object to a single demension, converting
 * the keys to dot notation.
 *
 * @example
 * crush({ name: 'ra', children: [{ name: 'hathor' }] })
 * // { name: 'ra', 'children.0.name': 'hathor' }
 */
export const crush = <TValue extends object>(value: TValue): object => {
  if (!value) return {}
  return objectify(
    keys(value),
    k => k,
    k => get(value, k)
  )
}

/**
 * The opposite of crush, given an object that was
 * crushed into key paths and values will return
 * the original object reconstructed.
 *
 * @example
 * construct({ name: 'ra', 'children.0.name': 'hathor' })
 * // { name: 'ra', children: [{ name: 'hathor' }] }
 */
export const construct = <TObject extends object>(obj: TObject): object => {
  if (!obj) return {}
  return Object.keys(obj).reduce((acc, path) => {
    return set(acc, path, (obj as any)[path])
  }, {})
}
