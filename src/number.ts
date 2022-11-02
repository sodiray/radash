export const toFloat = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  if (value === null || value === undefined) {
    return defaultValue ?? 0.0
  }
  const result = parseFloat(value)
  return isNaN(result) ? defaultValue ?? 0.0 : result
}

export const toInt = <T extends number | null>(
  value: any,
  defaultValue?: T
): number | T => {
  if (value === null || value === undefined) {
    return defaultValue ?? 0
  }
  const result = parseInt(value)
  return isNaN(result) ? defaultValue ?? 0 : result
}
