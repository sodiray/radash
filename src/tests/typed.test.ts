import { assert } from 'chai'
import _ from '..'

describe('typed module', () => {

  describe('isArray function', () => {
    test('returns false for null', () => {
      const result = _.isArray(null)
      assert.isFalse(result)
    })
    test('returns false for undefined', () => {
      const result = _.isArray(undefined)
      assert.isFalse(result)
    })
    test('returns false for boolean', () => {
      const result = _.isArray(false)
      assert.isFalse(result)
    })
    test('returns false for object', () => {
      const result = _.isArray({})
      assert.isFalse(result)
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isArray(new Data())
      assert.isFalse(result)
    })
    test('returns false for number', () => {
      const result = _.isArray(22)
      assert.isFalse(result)
    })
    test('returns false for string', () => {
      const result = _.isArray('abc')
      assert.isFalse(result)
    })
    test('returns true for array', () => {
      const result = _.isArray([ 1, 2, 3])
      assert.isTrue(result)
    })
    test('returns true for empty array', () => {
      const result = _.isArray([])
      assert.isTrue(result)
    })
  })

  describe('isObject function', () => {
    test('returns false for null', () => {
      const result = _.isObject(null)
      assert.isFalse(result)
    })
    test('returns false for undefined', () => {
      const result = _.isObject(undefined)
      assert.isFalse(result)
    })
    test('returns false for boolean', () => {
      const result = _.isObject(false)
      assert.isFalse(result)
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isObject(new Data())
      assert.isFalse(result)
    })
    test('returns false for number', () => {
      const result = _.isObject(22)
      assert.isFalse(result)
    })
    test('returns false for string', () => {
      const result = _.isObject('abc')
      assert.isFalse(result)
    })
    test('returns false for array', () => {
      const result = _.isObject([ 1, 2, 3])
      assert.isFalse(result)
    })
    test('returns true for object', () => {
      const result = _.isObject({})
      assert.isTrue(result)
    })
  })

  describe('isFunction function', () => {
    test('returns false for null', () => {
      const result = _.isFunction(null)
      assert.isFalse(result)
    })
    test('returns false for undefined', () => {
      const result = _.isFunction(undefined)
      assert.isFalse(result)
    })
    test('returns false for boolean', () => {
      const result = _.isFunction(false)
      assert.isFalse(result)
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isFunction(new Data())
      assert.isFalse(result)
    })
    test('returns false for number', () => {
      const result = _.isFunction(22)
      assert.isFalse(result)
    })
    test('returns false for string', () => {
      const result = _.isFunction('abc')
      assert.isFalse(result)
    })
    test('returns false for array', () => {
      const result = _.isFunction([ 1, 2, 3])
      assert.isFalse(result)
    })
    test('returns false for object', () => {
      const result = _.isFunction({})
      assert.isFalse(result)
    })
    test('returns true for anonymous function', () => {
      const result = _.isFunction(function() {
        return 'hello'
      })
      assert.isTrue(result)
    })
    test('returns true for arrow function', () => {
      const result = _.isFunction(() => {
        return 'hello'
      })
      assert.isTrue(result)
    })
    test('returns true for named function', () => {
      function sayHello() {
        return 'hello'
      }
      const result = _.isFunction(sayHello)
      assert.isTrue(result)
    })
  })

  describe('isString function', () => {
    test('returns false for null', () => {
      const result = _.isString(null)
      assert.isFalse(result)
    })
    test('returns false for undefined', () => {
      const result = _.isString(undefined)
      assert.isFalse(result)
    })
    test('returns false for boolean', () => {
      const result = _.isString(false)
      assert.isFalse(result)
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isString(new Data())
      assert.isFalse(result)
    })
    test('returns false for number', () => {
      const result = _.isString(22)
      assert.isFalse(result)
    })
    test('returns false for array', () => {
      const result = _.isString([ 1, 2, 3])
      assert.isFalse(result)
    })
    test('returns true for object', () => {
      const result = _.isString({})
      assert.isFalse(result)
    })
    test('returns true for string', () => {
      const result = _.isString('abc')
      assert.isTrue(result)
    })
    test('returns true for string class', () => {
      const result = _.isString(String('abc'))
      assert.isTrue(result)
    })
  })

})
