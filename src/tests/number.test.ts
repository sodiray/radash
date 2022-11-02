import { assert } from 'chai'
import * as _ from '..'

describe('number module', () => {
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
