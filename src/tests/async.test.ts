import { assert } from 'chai'
import _ from '..'


describe('async module', () => {

  describe('asyncReduce function', () => {
    test('returns result of reducer', async () => {
      const numbers = [
        0, 1, 2, 3, 4 // => 10
      ]
      const asyncSum = async (a: number, b: number): Promise<number> => {
        return new Promise(res => res(a + b))
      }
      const result = await _.asyncReduce<number, number>(numbers)(asyncSum, 0)
      assert.equal(result, 10)
    })
  })

  describe('asyncMap function', () => {
    test('returns result of mapper', async () => {
      const numbers = [
        1, 2, 3, 4
      ]
      const asyncSquare = async (a: number): Promise<number> => {
        return new Promise(res => res(a*a))
      }
      const result = await _.asyncMap<number, number>(numbers)(asyncSquare)
      assert.deepEqual(result, [1, 4, 9, 16])
    })
  })

})
