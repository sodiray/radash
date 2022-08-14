export const series = <T extends string | symbol>(...items: T[]) => {
  const { itemsByValue, itemsByIndex } = items.reduce(
    (acc, item, idx) => ({
      itemsByValue: {
        ...acc.itemsByValue,
        [item]: idx,
      },
      itemsByIndex: {
        ...acc.itemsByIndex,
        [idx]: item,
      },
    }),
    {
      itemsByValue: {} as Record<T, number>,
      itemsByIndex: {} as Record<number, T>,
    }
  );
  return {
    min: (a: T, b: T): T => {
      return itemsByValue[a] < itemsByValue[b] ? a : b;
    },
    max: (a: T, b: T): T => {
      return itemsByValue[a] > itemsByValue[b] ? a : b;
    },
    first: () => {
      return itemsByIndex[0];
    },
    last: () => {
      return itemsByIndex[items.length - 1];
    },
    next: <TDefault extends null | T> (current: T, defaultValue?: TDefault): T | TDefault => {
      return itemsByIndex[itemsByValue[current] + 1] ?? defaultValue;
    },
    previous: <TDefault extends null | T> (current: T, defaultValue?: TDefault): T | TDefault => {
      return itemsByIndex[itemsByValue[current] - 1] ?? defaultValue;
    },
  };
};
