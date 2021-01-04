import zlib from 'zlib'

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

export const compress = (data) => Buffer.from(JSON.stringify(data ?? {})).toString('base64')
export const decompress = (str) => str ? JSON.parse(Buffer.from(str, 'base64').toString()) : {}

export const xcomp = (data) => zlib.brotliCompressSync(JSON.stringify(data ?? {}))
export const xdecomp = (str) => str ? JSON.parse(zlib.brotliDecompressSync(str).toString()) : {}