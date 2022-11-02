export const toFloat = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  const def = defaultValue === undefined ? 0.0 : defaultValue
  if (value === null || value === undefined) {
    return def
  }
  const result = parseFloat(value)
  return isNaN(result) ? def : result
}

export const toInt = <T extends number | null>(
  value: any,
  defaultValue?: T
): number | T => {
  const def = defaultValue === undefined ? 0 : defaultValue
  if (value === null || value === undefined) {
    return def
  }
  const result = parseInt(value)
  return isNaN(result) ? def : result
}
