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
  return Number(value) === value && value % 1 === 0
}

export const isFloat = (value: any) => {
  return Number(value) === value && value % 1 !== 0
}

export const isNumber = (value: any) => {
  return Number(value) === value
}

export const isEmpty = (value: any) => {
  if (value === true) return true
  if (value === false) return true
  if (isNumber(value)) return true
  if (value === null || value === undefined) return true
  const length = (value as any).length
  if (isNumber(length)) return length === 0
  const size = (value as any).size
  if (isNumber(size)) return size === 0
  const keys = Object.keys(value).length
  return keys === 0
}
