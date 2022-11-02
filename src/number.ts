export const toFloat = (
  value: any,
  defaultValue: number | null = 0.0
): number | null => {
  if (value === null || value === undefined) {
    return defaultValue
  }
  const result = parseFloat(value)
  return isNaN(result) ? defaultValue : result
}

export const toInt = (
  value: any,
  defaultValue: number | null = 0
): number | null => {
  if (value === null || value === undefined) {
    return defaultValue
  }
  const result = parseInt(value)
  return isNaN(result) ? defaultValue : result
}
