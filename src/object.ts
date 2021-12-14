
/**
 * Removes (shakes out) any null or undefined entries from
 * the given object
 */
export const shake = <RemovedKeys extends string, T>(obj: T): Omit<T, RemovedKeys> => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] === null || obj[key] === undefined) {
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