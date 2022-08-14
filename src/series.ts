/**
 * Creates a series object around a list of values
 * that should be treated with order.
 */
export const series = <T extends string | symbol>(...items: T[]) => {
  const { itemsByValue, itemsByIndex } = items.reduce(
    (acc, item, idx) => ({
      itemsByValue: {
        ...acc.itemsByValue,
        [item]: idx
      },
      itemsByIndex: {
        ...acc.itemsByIndex,
        [idx]: item
      }
    }),
    {
      itemsByValue: {} as Record<T, number>,
      itemsByIndex: {} as Record<number, T>
    }
  )
  return {
    /**
     * Given two values in the series, returns the
     * value that occurs later in the series
     */
    min: (a: T, b: T): T => {
      return itemsByValue[a] < itemsByValue[b] ? a : b
    },
    /**
     * Given two values in the series, returns the
     * value that occurs earlier in the series
     */
    max: (a: T, b: T): T => {
      return itemsByValue[a] > itemsByValue[b] ? a : b
    },
    /**
     * Returns the first item from the series
     */
    first: () => {
      return itemsByIndex[0]
    },
    /**
     * Returns the last item in the series
     */
    last: () => {
      return itemsByIndex[items.length - 1]
    },
    /**
     * Given an item in the series returns the next item
     * in the series or default if the given value is
     * the last item in the series
     */
    next: <TDefault extends null | T>(
      current: T,
      defaultValue?: TDefault
    ): T | TDefault => {
      return itemsByIndex[itemsByValue[current] + 1] ?? defaultValue
    },
    /**
     * Given an item in the series returns the previous item
     * in the series or default if the given value is
     * the first item in the series
     */
    previous: <TDefault extends null | T>(
      current: T,
      defaultValue?: TDefault
    ): T | TDefault => {
      return itemsByIndex[itemsByValue[current] - 1] ?? defaultValue
    }
  }
}
