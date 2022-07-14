export const series = <T extends string | symbol>(...items: T[]) => {
  const dict = items.reduce(
    (acc, item, idx) => ({
      ...acc,
      [item]: idx,
    }),
    {} as Record<T, number>
  )
  return {
    min: (a: T, b: T): T => {
      return dict[a] < dict[b] ? a : b
    },
    max: (a: T, b: T): T => {
      return dict[a] > dict[b] ? a : b
    },
  }
}
