



export const asyncReduce = (array) => async (asyncHandler, startingValue) => {
  let result = startingValue
  for (const value of array) {
    result = await asyncHandler(result, value);
  }
  return result
}

export const asyncMap = (array) => async (asyncMapFunc) => {
  let result = []
  for (const value of array) {
    const newValue = await asyncMapFunc(value)
    result.push(newValue)
  }
  return result
}