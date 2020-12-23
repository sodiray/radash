


export const isArray = (value) => {
  return (!!value) && (value.constructor === Array)
}

export const isObject = (value) => {
  return (!!value) && (value.constructor === Object)
}

export const isFunction = (value) => {
  return !!(value && value.constructor && value.call && value.apply)
}