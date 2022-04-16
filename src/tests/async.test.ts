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
  
  describe('reduce/asyncReduceV2 function', () => {

    const numbers = [ 0, 1, 2, 3, 4 ]
    const reducer = async (a: number, b: number): Promise<number> => {
      return new Promise(res => res(a + b))
    }

    test('calls asyncReduce', async () => {
      const result = await _.reduce<number, number>(numbers, reducer, 0)
      assert.equal(result, 10)
    })
    test('uses first item in array when no init provided', async () => {
      const result = await _.reduce(numbers, reducer)
      assert.equal(result, 10)
    })
    test('throws on no init value and an empty array', async () => {
      try {
        await _.reduce([], reducer)
      } catch (err) {
        assert.isNotNull(err)
        return
      }
      assert.fail('Expected error to be thrown')
    })
    test('throws on no init value and a null array input', async () => {
      try {
        await _.reduce(null, reducer)
      } catch (err) {
        assert.isNotNull(err)
        return
      }
      assert.fail('Expected error to be thrown')
    })
  })

  describe('map/asyncMapV2 function', () => {
    test('calls asyncMap', async () => {
      const numbers = [
        1, 2, 3, 4
      ]
      const asyncSquare = async (a: number): Promise<number> => {
        return new Promise(res => res(a*a))
      }
      const result = await _.map<number, number>(numbers, asyncSquare)
      assert.deepEqual(result, [1, 4, 9, 16])
    })
  })

})
