
/**
 * Generates a random number between min and max
 */
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}