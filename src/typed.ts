
export const isArray = (value: any) => {
  return (!!value) && (value.constructor === Array)
}

export const isObject = (value: any) => {
  return (!!value) && (value.constructor === Object)
}

export const isFunction = (value: any) => {
  return !!(value && value.constructor && value.call && value.apply)
}