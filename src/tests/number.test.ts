import { assert } from 'chai'
import * as _ from '..'

describe('number module', () => {
  describe('inRange function', () => {
    test('handles nullish values', () => {
      assert.strictEqual(_.inRange(0, 1, null as any), false)
      assert.strictEqual(_.inRange(0, null as any, 1), false)
      assert.strictEqual(_.inRange(null as any, 0, 1), false)
      assert.strictEqual(_.inRange(0, undefined as any, 1), false)
      assert.strictEqual(_.inRange(undefined as any, 0, 1), false)

      assert.strictEqual(_.inRange(0, 1, undefined as any), true)
    })
    test('handles bad input', () => {
      const result = _.inRange(0, 1, {} as any)
      assert.strictEqual(result, false)
    })
    test('computes correctly', () => {
      assert.strictEqual(_.inRange(10, 0, 5), false)
      assert.strictEqual(_.inRange(10, 0, 20), true)
      assert.strictEqual(_.inRange(9.99, 0, 10), true)
      assert.strictEqual(_.inRange(Math.PI, 0, 3.15), true)
    })
    test('handles the different syntax of number type', () => {
      assert.strictEqual(_.inRange(0, -1, 1), true)
      assert.strictEqual(_.inRange(Number(0), -1, 1), true)
      assert.strictEqual(_.inRange(+'0', -1, 1), true)
    })
    test('handles the undefined end', () => {
      assert.strictEqual(_.inRange(1, 2), true)
      assert.strictEqual(_.inRange(1.2, 2), true)
      assert.strictEqual(_.inRange(2, 1), false)
      assert.strictEqual(_.inRange(2, 2), false)
      assert.strictEqual(_.inRange(3.2, 2), false)
      assert.strictEqual(_.inRange(-1, 1), false)
    })
    test('handles the exclusive end of the range', () => {
      assert.strictEqual(_.inRange(1, 0, 1), false)
      assert.strictEqual(_.inRange(10.0, 0, 10), false)
    })
    test('handles the inclusive start of the range', () => {
      assert.strictEqual(_.inRange(0, 0, 1), true)
      assert.strictEqual(_.inRange(10.0, 10, 20), true)
    })
  })

  describe('toFloat function', () => {
    test('handles null', () => {
      const result = _.toFloat(null)
      assert.strictEqual(result, 0.0)
    })
    test('handles undefined', () => {
      const result = _.toFloat(undefined)
      assert.strictEqual(result, 0.0)
    })
    test('uses null default', () => {
      const result = _.toFloat('x', null)
      assert.strictEqual(result, null)
    })
    test('handles bad input', () => {
      const result = _.toFloat({})
      assert.strictEqual(result, 0.0)
    })
    test('converts 20.00 correctly', () => {
      const result = _.toFloat('20.00')
      assert.strictEqual(result, 20.0)
    })
  })

  describe('toInt function', () => {
    test('handles null', () => {
      const result = _.toInt(null)
      assert.strictEqual(result, 0)
    })
    test('uses null default', () => {
      const result = _.toInt('x', null)
      assert.strictEqual(result, null)
    })
    test('handles undefined', () => {
      const result = _.toInt(undefined)
      assert.strictEqual(result, 0)
    })
    test('handles bad input', () => {
      const result = _.toInt({})
      assert.strictEqual(result, 0)
    })
    test('converts 20 correctly', () => {
      const result = _.toInt('20')
      assert.strictEqual(result, 20)
    })
  })
})
