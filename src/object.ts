
/**
 * Removes (shakes out) any null or undefined entries from
 * the given object
 */
export const shake = <RemovedKeys extends string, T>(obj: T, filter: (value: any) => boolean = (x) => x === undefined): Omit<T, RemovedKeys> => {
  return Object.keys(obj).reduce((acc, key) => {
    if (filter(obj[key])) {
      return acc
    }
    else return { ...acc, [key]: obj[key] }
  }, {} as T)
}

/**
 * Map over all the keys of an object to return
 * a new object
 */
export const mapKeys = <T>(obj: Record<string, T>, mapFunc: (key: string) => string) => {
  return Object.keys(obj).reduce((acc, key) => ({
    ...acc,
    [mapFunc(key)]: obj[key]
  }), {})
}

/**
 * Map over all the keys to create a new object
 */
export const mapValues = <T, K>(obj: Record<string, T>, mapFunc: (item: T) => K) => {
  return Object.keys(obj).reduce((acc, key) => ({
    ...acc,
    [key]: mapFunc(obj[key])
  }), {})
}

export const lowerize = <T>(obj: Record<string, T>) => mapKeys(obj, k => k.toLowerCase())
export const upperize = <T>(obj: Record<string, T>) => mapKeys(obj, k => k.toUpperCase())

export const clone = <T extends object = object>(obj: T): T => {
  return Object.getOwnPropertyNames(obj).reduce((acc, name) => ({
    ...acc,
    [name]: obj[name]
  }), {} as T)
}

export const listify = <T, K>(obj: Record<string | number | symbol, T>, toItem: (record: { key: string, value: T }) => K) => {
  if (!obj) return []
  const entries = Object.entries(obj)
  if (entries.length === 0) return []
  return entries.reduce((acc, entry) => {
    return [...acc, toItem({ key: entry[0], value: entry[1] })]
  }, [] as K[])
}

export const pick = <T, TKeys extends keyof T>(obj: T, keys: TKeys[]): Pick<T, TKeys> => {
  if (!obj) return {} as Pick<T, TKeys>
  return keys.reduce((acc, key) => {
    return { ...acc, [key]: obj[key] }
  }, {} as Pick<T, TKeys>)
}

export const omit = <T, TKeys extends keyof T>(obj: T, keys: TKeys[]): Omit<T, TKeys> => {
  if (!obj) return {} as Omit<T, TKeys>
  if (!keys || keys.length === 0) return obj as Omit<T, TKeys>
  const keyMap = keys.reduce((acc, key) => {
    return { ...acc, [key]: true }
  }, {} as Record<TKeys, true>)
  return Object.keys(obj).reduce((acc, key) => {
    if (keyMap[key] === true) return acc
    return { ...acc, [key]: obj[key] }
  }, {} as Omit<T, TKeys>)
}

export const get = <T, K> (value: T, getter: (t: T) => K, defaultValue: K | null = null) => {
  try {
    return getter(value) ?? defaultValue
  } catch {
    return defaultValue
  }
}