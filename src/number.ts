export const toFloat = (value: any, defaultValue: number = 0.0) => {
  if (value === null || value === undefined) {
    return defaultValue
  }
  const result = parseFloat(value)
  return isNaN(result) ? defaultValue : result
}

export const toInt = (value: any, defaultValue: number = 0) => {
  if (value === null || value === undefined) {
    return defaultValue
  }
  const result = parseInt(value)
  return isNaN(result) ? defaultValue : result
}
