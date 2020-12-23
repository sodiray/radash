
/**
 * Removes (shakes out) any null or undefined entries from
 * the given object
 * @param {object} obj The object to shake out values from
 */
export const shake = (obj) => Object.keys(obj).reduce((acc, key) => {
  (obj[key] === null || obj[key] === undefined) ? acc : { ...acc, [key]: obj[key] }
}, {})

export const mapKeys = (obj, mapFunc) => Object.keys(obj).reduce((acc, key) => ({ 
  ...acc, 
  [mapFunc(key)]: obj[key]
}), {})

export const mapValues = (obj, mapFunc) => Object.keys(obj).reduce((acc, key) => ({ 
  ...acc, 
  [key]: mapFunc(obj[key])
}), {})

export const lowerize = (obj) => mapKeys(obj, k => k.toLowerCase())
export const upperize = (obj) => mapKeys(obj, k => k.toUpperCase())

export const clone = (obj) => Object.getOwnPropertyNames(obj).reduce((acc, name) => ({
  ...acc,
  [name]: obj[name]
}), {})