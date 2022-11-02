export const toFloat = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  if (value === null || value === undefined) {
    return defaultValue ?? (0.0 as T)
  }
  const result = parseFloat(value)
  return isNaN(result) ? defaultValue ?? (0.0 as T) : (result as T)
}

export const toInt = <T extends number | null>(
  value: any,
  defaultValue?: T
): number | T => {
  if (value === null || value === undefined) {
    return defaultValue ?? (0 as T)
  }
  const result = parseInt(value)
  return isNaN(result) ? defaultValue ?? (0 as T) : (result as T)
}
