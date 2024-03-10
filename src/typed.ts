export const isSymbol = (value: any): value is symbol => {
  return !!value && value.constructor === Symbol
}

export const isArray = (value: any): value is unknown[] => {
  return !!value && value.constructor === Array
}

export const isTypedArray = (value: any): value is unknown[] => {
  return (
    !!value &&
    (value.constructor === Int8Array ||
      value.constructor === Uint8Array ||
      value.constructor === Uint8ClampedArray ||
      value.constructor === Int16Array ||
      value.constructor === Uint16Array ||
      value.constructor === Int32Array ||
      value.constructor === Uint32Array ||
      value.constructor === BigInt64Array ||
      value.constructor === BigUint64Array ||
      value.constructor === Float32Array ||
      value.constructor === Float64Array)
  )
}

export const isIndexedCollections = (value: any): value is unknown[] => {
  return isArray(value) || isTypedArray(value)
}

export const isSet = (value: any): value is Set<unknown> => {
  return !!value && value.constructor === Set
}

export const isMap = (value: any): value is Map<unknown, unknown> => {
  return !!value && value.constructor === Map
}

export const isKeyedCollections = (
  value: any
): value is Set<unknown> | Map<unknown, unknown> => {
  return isSet(value) || isMap(value)
}

export const isObject = (value: any): value is object => {
  return !!value && value.constructor === Object
}

/**
 * Checks if the given value is primitive.
 *
 * Primitive Types: number , string , boolean , symbol, bigint, undefined, null
 *
 * @param {*} value value to check
 * @returns {boolean} result
 */
export const isPrimitive = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function')
  )
}

export const isFunction = (value: any): value is Function => {
  return !!(value && value.constructor && value.call && value.apply)
}

export const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String
}

export const isInt = (value: any): value is number | bigint => {
  return (isNumber(value) && value % 1 === 0) || isBigInt(value)
}

export const isFloat = (value: any): value is number => {
  return isNumber(value) && value % 1 !== 0
}

export const isNumber = (value: any): value is number => {
  try {
    return Number(value) === value
  } catch {
    return false
  }
}

export const isBigInt = (value: any): value is bigint => {
  return typeof value === 'bigint'
}

export const isDate = (value: any): value is Date => {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export const isEmpty = (value: any) => {
  if (value === true || value === false) return true
  if (value === null || value === undefined) return true
  if (isNumber(value)) return value === 0
  if (isBigInt(value)) return value === 0n
  if (isDate(value)) return isNaN(value.getTime())
  if (isFunction(value)) return false
  if (isSymbol(value)) return false
  if (isIndexedCollections(value)) return value.length === 0
  if (isKeyedCollections(value)) return value.size === 0
  return Object.keys(value).length === 0
}

export const isEqual = <TType>(x: TType, y: TType): boolean => {
  if (Object.is(x, y)) return true
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime()
  }
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString()
  }
  if (
    typeof x !== 'object' ||
    x === null ||
    typeof y !== 'object' ||
    y === null
  ) {
    return false
  }
  const keysX = Reflect.ownKeys(x as unknown as object) as (keyof typeof x)[]
  const keysY = Reflect.ownKeys(y as unknown as object)
  if (keysX.length !== keysY.length) return false
  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y as unknown as object, keysX[i])) return false
    if (!isEqual(x[keysX[i]], y[keysX[i]])) return false
  }
  return true
}
