export const isSymbol = (value: any) => {
  return !!value && value.constructor === Symbol
}

export const isArray = (value: any) => {
  return !!value && value.constructor === Array
}

export const isObject = (value: any) => {
  return !!value && value.constructor === Object
}

export const isFunction = (value: any) => {
  return !!(value && value.constructor && value.call && value.apply)
}

export const isString = (value: any) => {
  return typeof value === 'string' || value instanceof String
}

export const isInt = (value: any) => {
  return isNumber(value) && value % 1 === 0
}

export const isFloat = (value: any) => {
  return isNumber(value) && value % 1 !== 0
}

export const isNumber = (value: any) => {
  try {
    return Number(value) === value
  } catch {
    return false
  }
}

export const isDate = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Date]"
}

export const isEmpty = (value: any) => {
  if (value === true || value === false) return true
  if (value === null || value === undefined) return true
  if (isNumber(value)) return parseInt(value) === 0
  if (isDate(value)) return isNaN(value)
  if (isFunction(value)) return false
  if (isSymbol(value)) return false
  const length = (value as any).length
  if (isNumber(length)) return length === 0
  const size = (value as any).size
  if (isNumber(size)) return size === 0
  const keys = Object.keys(value).length
  return keys === 0
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
  const keysX = Reflect.ownKeys(x as unknown as object)
  const keysY = Reflect.ownKeys(y as unknown as object)
  if (keysX.length !== keysY.length) return false
  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y as unknown as object, keysX[i])) return false
    if (!isEqual(x[keysX[i]], y[keysX[i]])) return false
  }
  return true
}
