import { assert } from 'chai'
import * as _ from '..'

describe('typed module', () => {
  describe('isArray function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isArray(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isArray(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isArray(false))
    })
    test('returns false for an object', () => {
      assert.isFalse(_.isArray({}))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isArray(new Data()))
    })
    test('returns false for a number', () => {
      assert.isFalse(_.isArray(22))
    })
    test('returns false for a bigint', () => {
      assert.isFalse(_.isArray(22n))
    })
    test('returns false for a string', () => {
      assert.isFalse(_.isArray('abc'))
    })
    test('returns false for a set', () => {
      assert.isFalse(_.isArray(new Set()))
    })
    test('returns false for a map', () => {
      assert.isFalse(_.isArray(new Map()))
    })
    test('returns true for an array', () => {
      assert.isTrue(_.isArray([1, 2, 3]))
    })
    test('returns false for a typed array', () => {
      assert.isFalse(_.isArray(new Uint8Array([1, 2, 3])))
    })
    test('returns true for an empty array', () => {
      assert.isTrue(_.isArray([]))
    })
  })

  describe('isTypedArray function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isTypedArray(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isTypedArray(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isTypedArray(false))
    })
    test('returns false for an object', () => {
      assert.isFalse(_.isTypedArray({}))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isTypedArray(new Data()))
    })
    test('returns false for a number', () => {
      assert.isFalse(_.isTypedArray(22))
    })
    test('returns false for a bigint', () => {
      assert.isFalse(_.isTypedArray(22n))
    })
    test('returns false for a string', () => {
      assert.isFalse(_.isTypedArray('abc'))
    })
    test('returns false for a set', () => {
      assert.isFalse(_.isTypedArray(new Set()))
    })
    test('returns false for a map', () => {
      assert.isFalse(_.isTypedArray(new Map()))
    })
    test('returns true for a typed array', () => {
      assert.isTrue(_.isTypedArray(new Uint8Array([1, 2, 3])))
    })
    test('returns true for an empty typed array', () => {
      assert.isTrue(_.isTypedArray(new Int16Array()))
    })
    test('returns false for a non-typed array', () => {
      assert.isFalse(_.isTypedArray([1, 2, 3]))
    })
  })

  describe('isIndexedCollections function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isIndexedCollections(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isIndexedCollections(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isIndexedCollections(false))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isIndexedCollections(new Data()))
    })
    test('returns false for a number', () => {
      assert.isFalse(_.isIndexedCollections(22))
    })
    test('returns false for a bigint', () => {
      assert.isFalse(_.isIndexedCollections(22n))
    })
    test('returns false for a string', () => {
      assert.isFalse(_.isIndexedCollections('abc'))
    })
    test('returns false for a set', () => {
      assert.isFalse(_.isIndexedCollections(new Set()))
    })
    test('returns false for a map', () => {
      assert.isFalse(_.isIndexedCollections(new Map()))
    })
    test('returns true for an array', () => {
      assert.isTrue(_.isIndexedCollections([1, 2, 3]))
    })
    test('returns true for a typed array', () => {
      assert.isTrue(_.isIndexedCollections(new Uint8Array([1, 2, 3])))
    })
    test('returns false for an object', () => {
      assert.isFalse(_.isIndexedCollections({}))
    })
  })

  describe('isSet function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isSet(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isSet(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isSet(false))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isSet(new Data()))
    })
    test('returns false for a number', () => {
      assert.isFalse(_.isSet(22))
    })
    test('returns false for a bigint', () => {
      assert.isFalse(_.isSet(22n))
    })
    test('returns false for a string', () => {
      assert.isFalse(_.isSet('abc'))
    })
    test('returns true for a set', () => {
      assert.isTrue(_.isSet(new Set()))
    })
    test('returns false for a map', () => {
      assert.isFalse(_.isSet(new Map()))
    })
    test('returns false for an array', () => {
      assert.isFalse(_.isSet([1, 2, 3]))
    })
    test('returns false for a typed array', () => {
      assert.isFalse(_.isSet(new Uint8Array([1, 2, 3])))
    })
    test('returns false for an object', () => {
      assert.isFalse(_.isSet({}))
    })
  })

  describe('isMap function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isMap(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isMap(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isMap(false))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isMap(new Data()))
    })
    test('returns false for a number', () => {
      assert.isFalse(_.isMap(22))
    })
    test('returns false for a bigint', () => {
      assert.isFalse(_.isMap(22n))
    })
    test('returns false for a string', () => {
      assert.isFalse(_.isMap('abc'))
    })
    test('returns false for a set', () => {
      assert.isFalse(_.isMap(new Set()))
    })
    test('returns true for a map', () => {
      assert.isTrue(_.isMap(new Map()))
    })
    test('returns false for an array', () => {
      assert.isFalse(_.isMap([1, 2, 3]))
    })
    test('returns false for a typed array', () => {
      assert.isFalse(_.isMap(new Uint8Array([1, 2, 3])))
    })
    test('returns false for an object', () => {
      assert.isFalse(_.isMap({}))
    })
  })

  describe('isKeyedCollections function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isKeyedCollections(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isKeyedCollections(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isKeyedCollections(false))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isKeyedCollections(new Data()))
    })
    test('returns false for a number', () => {
      assert.isFalse(_.isKeyedCollections(22))
    })
    test('returns false for a bigint', () => {
      assert.isFalse(_.isKeyedCollections(22n))
    })
    test('returns false for a string', () => {
      assert.isFalse(_.isKeyedCollections('abc'))
    })
    test('returns true for a set', () => {
      assert.isTrue(_.isKeyedCollections(new Set()))
    })
    test('returns true for a map', () => {
      assert.isTrue(_.isKeyedCollections(new Map()))
    })
    test('returns false for an array', () => {
      assert.isFalse(_.isKeyedCollections([1, 2, 3]))
    })
    test('returns false for a typed array', () => {
      assert.isFalse(_.isKeyedCollections(new Uint8Array([1, 2, 3])))
    })
    test('returns false for an object', () => {
      assert.isFalse(_.isKeyedCollections({}))
    })
  })

  describe('isObject function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isObject(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isObject(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isObject(false))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isObject(new Data()))
    })
    test('returns false for a number', () => {
      assert.isFalse(_.isObject(22))
    })
    test('returns false for a bigint', () => {
      assert.isFalse(_.isObject(22n))
    })
    test('returns false for a string', () => {
      assert.isFalse(_.isObject('abc'))
    })
    test('returns false for a set', () => {
      assert.isFalse(_.isObject(new Set()))
    })
    test('returns false for a map', () => {
      assert.isFalse(_.isObject(new Map()))
    })
    test('returns false for an array', () => {
      assert.isFalse(_.isObject([1, 2, 3]))
    })
    test('returns false for a typed array', () => {
      assert.isFalse(_.isSet(new Uint8Array([1, 2, 3])))
    })
    test('returns true for an object', () => {
      assert.isTrue(_.isObject({}))
    })
  })

  describe('isPrimitive function', () => {
    test('returns true for all primitives', () => {
      const arr = [
        1.1,
        'How you doin?',
        false,
        Symbol('key'),
        BigInt('1'),
        undefined,
        null
      ]

      for (const elm of arr) {
        assert.isTrue(_.isPrimitive(elm))
      }
    })
    test('returns false for non-primitives', () => {
      const arr = [new Date(), Number, {}, Object({}), () => 0, [1, 2]]

      for (const elm of arr) {
        assert.isFalse(_.isPrimitive(elm))
      }
    })
  })

  describe('isFunction function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isFunction(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isFunction(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isFunction(false))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isFunction(new Data()))
    })
    test('returns true for a class instance method', () => {
      class Data {
        test() {}
      }
      assert.isTrue(_.isFunction(new Data().test))
    })
    test('returns false for a number', () => {
      assert.isFalse(_.isFunction(22))
    })
    test('returns false for a bigint', () => {
      assert.isFalse(_.isFunction(22n))
    })
    test('returns false for a string', () => {
      assert.isFalse(_.isFunction('abc'))
    })
    test('returns false for an array', () => {
      assert.isFalse(_.isFunction([1, 2, 3]))
    })
    test('returns false for a typed array', () => {
      assert.isFalse(_.isFunction(new Uint8Array([1, 2, 3])))
    })
    test('returns false for an object', () => {
      assert.isFalse(_.isFunction({}))
    })
    test('returns true for an anonymous function', () => {
      assert.isTrue(
        _.isFunction(function () {
          return 'hello'
        })
      )
    })
    test('returns true for an arrow function', () => {
      assert.isTrue(
        _.isFunction(() => {
          return 'hello'
        })
      )
    })
    test('returns true for a named function', () => {
      function sayHello() {
        return 'hello'
      }
      assert.isTrue(_.isFunction(sayHello))
    })
  })

  describe('isString function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isString(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isString(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isString(false))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isString(new Data()))
    })
    test('returns false for a number', () => {
      assert.isFalse(_.isString(22))
    })
    test('returns false for an array', () => {
      assert.isFalse(_.isString([1, 2, 3]))
    })
    test('returns false for an object', () => {
      assert.isFalse(_.isString({}))
    })
    test('returns true for a string', () => {
      assert.isTrue(_.isString('abc'))
    })
    test('returns true for a string class', () => {
      assert.isTrue(_.isString(String('abc')))
    })
  })

  describe('isNumber function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isNumber(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isNumber(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isNumber(false))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isNumber(new Data()))
    })
    test('returns true for an integer', () => {
      assert.isTrue(_.isNumber(22))
    })
    test('returns true for a float', () => {
      assert.isTrue(_.isNumber(22.0567))
    })
    test('returns false for a NaN', () => {
      assert.isFalse(_.isNumber(NaN))
    })
    test('returns false for a bigint', () => {
      assert.isFalse(_.isNumber(22n))
    })
    test('returns false for an array', () => {
      assert.isFalse(_.isNumber([1, 2, 3]))
    })
    test('returns false for an object', () => {
      assert.isFalse(_.isNumber({}))
    })
    test('returns false for a string', () => {
      assert.isFalse(_.isNumber('abc'))
    })
    test('returns false for a string class', () => {
      assert.isFalse(_.isNumber(String('abc')))
    })
  })

  describe('isBigInt function', () => {
    test('returns false for a null', () => {
      assert.isFalse(_.isBigInt(null))
    })
    test('returns false for an undefined', () => {
      assert.isFalse(_.isBigInt(undefined))
    })
    test('returns false for a boolean', () => {
      assert.isFalse(_.isBigInt(false))
    })
    test('returns false for a class instance', () => {
      class Data {}
      assert.isFalse(_.isBigInt(new Data()))
    })
    test('returns false for an integer', () => {
      assert.isFalse(_.isBigInt(22))
    })
    test('returns false for a float', () => {
      assert.isFalse(_.isBigInt(22.0567))
    })
    test('returns false for a NaN', () => {
      assert.isFalse(_.isBigInt(NaN))
    })
    test('returns true for a bigint', () => {
      assert.isTrue(_.isBigInt(22n))
    })
    test('returns false for an array', () => {
      assert.isFalse(_.isBigInt([1, 2, 3]))
    })
    test('returns false for a typed array', () => {
      assert.isFalse(_.isBigInt(new Int32Array()))
    })
    test('returns false for an object', () => {
      assert.isFalse(_.isBigInt({}))
    })
    test('returns false for a string', () => {
      assert.isFalse(_.isBigInt('abc'))
    })
    test('returns false for a string class', () => {
      assert.isFalse(_.isBigInt(String('abc')))
    })
  })

  describe('isInt function', () => {
    class Data {}
    test('returns false for non-number values', () => {
      assert.isFalse(_.isInt(undefined))
      assert.isFalse(_.isInt(null))
      assert.isFalse(_.isInt(false))
      assert.isFalse(_.isInt(new Data()))
      assert.isFalse(_.isInt(NaN))
      assert.isFalse(_.isInt([1, 2, 3]))
      assert.isFalse(_.isInt({}))
      assert.isFalse(_.isInt('abc'))
      assert.isFalse(_.isInt(String('abc')))
    })
    test('returns true for an integer', () => {
      assert.isTrue(_.isInt(22))
    })
    test('returns true for an integer with decimal part', () => {
      assert.isTrue(_.isInt(22.0))
    })
    test('returns true for a bigint', () => {
      assert.isTrue(_.isInt(22n))
    })
    test('returns false for a float', () => {
      assert.isFalse(_.isInt(22.0567))
    })
  })

  describe('isFloat function', () => {
    class Data {}
    test('returns false for non-number values', () => {
      assert.isFalse(_.isFloat(undefined))
      assert.isFalse(_.isFloat(null))
      assert.isFalse(_.isFloat(false))
      assert.isFalse(_.isFloat(new Data()))
      assert.isFalse(_.isFloat(NaN))
      assert.isFalse(_.isFloat([1, 2, 3]))
      assert.isFalse(_.isFloat({}))
      assert.isFalse(_.isFloat('abc'))
      assert.isFalse(_.isFloat(String('abc')))
    })
    test('returns false for an integer', () => {
      assert.isFalse(_.isFloat(22))
    })
    test('returns true for a float', () => {
      assert.isTrue(_.isFloat(22.0567))
    })
  })

  describe('isEmpty function', () => {
    class Data {}
    class Person {
      name: string = 'ray'
    }
    test('returns true for empty values', () => {
      assert.isTrue(_.isEmpty(null))
      assert.isTrue(_.isEmpty(undefined))
      assert.isTrue(_.isEmpty(new Data()))
      assert.isTrue(_.isEmpty(0))
      assert.isTrue(_.isEmpty(0n))
      assert.isTrue(_.isEmpty(true))
      assert.isTrue(_.isEmpty([]))
      assert.isTrue(_.isEmpty(new Uint8Array([])))
      assert.isTrue(_.isEmpty(false))
      assert.isTrue(_.isEmpty({}))
      assert.isTrue(_.isEmpty(''))
      assert.isTrue(_.isEmpty(String()))
      assert.isTrue(_.isEmpty(new Map()))
      assert.isTrue(_.isEmpty(new Date('invalid value')))
    })
    test('returns false for non-empty values', () => {
      assert.isFalse(_.isEmpty(new Date()))
      assert.isFalse(_.isEmpty(new Date('2022-09-01T02:19:55.976Z')))
      assert.isFalse(_.isEmpty(22))
      assert.isFalse(_.isEmpty(22n))
      assert.isFalse(_.isEmpty(new Person()))
      assert.isFalse(_.isEmpty({ name: 'x' }))
      assert.isFalse(_.isEmpty({ length: 'x' }))
      assert.isFalse(_.isEmpty({ length: 0 }))
      assert.isFalse(_.isEmpty('abc'))
      assert.isFalse(_.isEmpty(String('abc')))
      assert.isFalse(_.isEmpty([1, 2, 3]))
      assert.isFalse(_.isEmpty(new Uint8Array(2)))
      assert.isFalse(_.isEmpty(function work() {}))
      assert.isFalse(_.isEmpty(() => {}))
      assert.isFalse(_.isEmpty(Symbol('')))
      assert.isFalse(_.isEmpty(Symbol('hello')))
      const map = new Map()
      map.set('a', 1)
      assert.isFalse(_.isEmpty(map))
    })
  })

  describe('isDate function', () => {
    test('return true for Date values', () => {
      assert.isTrue(_.isDate(new Date()))
      assert.isTrue(_.isDate(new Date('2022-09-01T02:19:55.976Z')))
      assert.isTrue(_.isDate(new Date('invalid value')))
    })
    test('return false for non-Date values', () => {
      assert.isFalse(_.isDate(22))
      assert.isFalse(_.isDate({ name: 'x' }))
      assert.isFalse(_.isDate('abc'))
      assert.isFalse(_.isDate(String('abc')))
      assert.isFalse(_.isDate([1, 2, 3]))
      assert.isFalse(_.isDate(function work() {}))
      assert.isFalse(_.isDate(() => {}))
      assert.isFalse(_.isDate(Symbol('')))
      assert.isFalse(_.isDate(Symbol('hello')))
    })
  })

  describe('isSymbol function', () => {
    test('returns false for a null', () => {
      const input = null
      assert.isFalse(_.isSymbol(input))
    })
    test('returns false for an undefined', () => {
      const input = undefined
      assert.isFalse(_.isSymbol(input))
    })
    test('returns false for an empty class instance', () => {
      class Data {}
      assert.isFalse(_.isSymbol(new Data()))
    })
    test('returns false for a class instance with properties', () => {
      class Data {
        name: string = 'ray'
      }
      assert.isFalse(_.isSymbol(new Data()))
    })
    test('returns false for a number greater than 0', () => {
      assert.isFalse(_.isSymbol(22))
    })
    test('returns false for the number 0', () => {
      assert.isFalse(_.isSymbol(0))
    })
    test('returns false for a bigint greater than 0', () => {
      assert.isFalse(_.isSymbol(22n))
    })
    test('returns false for the bigint 0', () => {
      assert.isFalse(_.isSymbol(0n))
    })
    test('returns false for an array with values', () => {
      assert.isFalse(_.isSymbol([1, 2, 3]))
    })
    test('returns false for an empty array', () => {
      assert.isFalse(_.isSymbol([]))
    })
    test('returns false for true', () => {
      assert.isFalse(_.isSymbol(true))
    })
    test('returns false for false', () => {
      assert.isFalse(_.isSymbol(false))
    })
    test('returns false for an empty object', () => {
      assert.isFalse(_.isSymbol({}))
    })
    test('returns false for an object with values', () => {
      assert.isFalse(_.isSymbol({ name: 'x' }))
    })
    test('returns false for a string with chars', () => {
      assert.isFalse(_.isSymbol('abc'))
    })
    test('returns false for an empty string', () => {
      assert.isFalse(_.isSymbol(''))
    })
    test('returns false for an empty string class', () => {
      assert.isFalse(_.isSymbol(String()))
    })
    test('returns false for a string class with chars', () => {
      assert.isFalse(_.isSymbol(String('abc')))
    })
    test('returns false for an empty Map', () => {
      assert.isFalse(_.isSymbol(new Map()))
    })
    test('returns true for an empty Symbol', () => {
      assert.isTrue(_.isSymbol(Symbol('')))
    })
    test('returns true for a Symbol instance', () => {
      assert.isTrue(_.isSymbol(Symbol('hello')))
    })
    test('returns false for a Map with values', () => {
      assert.isFalse(
        _.isSymbol(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3]
          ])
        )
      )
    })
  })

  describe('isEqual function', () => {
    class Person {
      name: string
      friends: Person[] = []
      self?: Person
      constructor(name: string) {
        this.name = name
      }
    }
    const jake = new Person('jake')
    jake.self = jake
    jake.friends = [jake, jake]
    const symbolKey = Symbol('symkey')
    const complex = {
      num: 0,
      str: '',
      boolean: true,
      unf: void 0,
      nul: null,
      obj: { name: 'object', id: 1, chilren: [0, 1, 2] },
      arr: [0, 1, 2],
      func() {
        console.log('function')
      },
      loop: null as any,
      person: jake,
      date: new Date(0),
      reg: new RegExp('/regexp/ig'),
      [symbolKey]: 'symbol'
    }
    complex.loop = complex
    test('returns true for equal things', () => {
      assert.isTrue(_.isEqual(0, 0))
      assert.isTrue(_.isEqual('a', 'a'))
      const hello = Symbol('hello')
      assert.isTrue(_.isEqual(hello, hello))
      assert.isTrue(_.isEqual({}, {}))
      assert.isTrue(_.isEqual(true, true))
      assert.isTrue(_.isEqual(new RegExp(/a*s/), new RegExp(/a*s/)))
      const now = new Date()
      assert.isTrue(_.isEqual(now, now))
      assert.isTrue(_.isEqual([], []))
      assert.isTrue(_.isEqual(complex, { ...complex }))
      assert.isTrue(
        _.isEqual([complex, complex], [{ ...complex }, { ...complex }])
      )
    })
    test('returns false for non-equal things', () => {
      assert.isFalse(_.isEqual(0, 1))
      assert.isFalse(_.isEqual('a', 'b'))
      assert.isFalse(_.isEqual(new RegExp(/^http:/), new RegExp(/https/)))
      assert.isFalse(_.isEqual(Symbol('hello'), Symbol('goodbye')))
      assert.isFalse(_.isEqual({ z: 23 }, { a: 1 }))
      assert.isFalse(_.isEqual(true, false))
      assert.isFalse(
        _.isEqual(new Date(), new Date('2022-09-01T03:25:12.750Z'))
      )
      assert.isFalse(_.isEqual([], [1]))
      assert.isFalse(_.isEqual(complex, { ...complex, num: 222 }))
      assert.isFalse(_.isEqual([complex], [{ ...complex, num: 222 }]))
    })
  })
})
