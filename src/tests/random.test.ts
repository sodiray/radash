import { expect } from 'vitest'
import * as _ from '..'

describe('random module', () => {
  describe('random function', () => {
    test('returns a number', () => {
      const result = _.random(0, 100)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(100)
    })
  })

  describe('uid function', () => {
    test('generates the correct length string', () => {
      const result = _.uid(10)
      expect(result.length).toBe(10)
    })
    /**
     * @warning This is potentially a flaky test.
     * We're trying to assert that given additional
     * special chars our function will include them
     * in the random selection process to generate the
     * uid. However, there is always a small chance that
     * one is never selected. If the test is flaky, increase
     * the size of the uid and/or the number of underscores
     * in the special char addition.
     */
    test('uid generates string including special', () => {
      const result = _.uid(
        300,
        '________________________________________________________________'
      )
      expect(result).toContain('_')
    })
  })

  describe('shuffle function', () => {
    test('returns list with same number of items', () => {
      const list = [1, 2, 3, 4, 5]
      const result = _.shuffle(list)
      expect(list.length).toBe(result.length)
    })
    test('returns list with same value', () => {
      const list = [1, 2, 3, 4, 5]
      const totalBefore = _.sum(list)
      const result = _.shuffle(list)
      const totalAfter = _.sum(result)
      expect(totalBefore).toBe(totalAfter)
    })
    test('returns copy of list without mutatuing input', () => {
      const list = [1, 2, 3, 4, 5]
      const result = _.shuffle(list)
      expect(list).not.toBe(result)
      expect(list).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('draw function', () => {
    test('returns a string from the list', () => {
      const letters = 'abcde'
      const result = _.draw(letters.split(''))
      expect(letters).toContain(result!)
    })
    test('returns a item from the list', () => {
      const list = [
        { id: 'a', word: 'hello' },
        { id: 'b', word: 'oh' },
        { id: 'c', word: 'yolo' }
      ]
      const result = _.draw(list)
      expect('abc').toContain(result!.id)
    })
    test('returns null given empty input', () => {
      const list: unknown[] = []
      const result = _.draw(list)
      expect(result).toBeNull()
    })
  })
})
