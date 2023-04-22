import { assert } from 'chai'
import * as _ from '..'

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
      const result = _.isArray([1, 2, 3])
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
      const result = _.isObject([1, 2, 3])
      assert.isFalse(result)
    })
    test('returns true for object', () => {
      const result = _.isObject({})
      assert.isTrue(result)
    })
  })

  describe('isPrimitive function', () => {
    test('returns true for all the primitives', () => {
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
    }),
      test('returns false for non-primitives', () => {
        const arr = [new Date(), Number, {}, Object({}), () => 0, [1, 2]]

        for (const elm of arr) {
          assert.isFalse(_.isPrimitive(elm))
        }
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
      const result = _.isFunction([1, 2, 3])
      assert.isFalse(result)
    })
    test('returns false for object', () => {
      const result = _.isFunction({})
      assert.isFalse(result)
    })
    test('returns true for anonymous function', () => {
      const result = _.isFunction(function () {
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
      const result = _.isString([1, 2, 3])
      assert.isFalse(result)
    })
    test('returns false for object', () => {
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

  describe('isNumber function', () => {
    test('returns false for null', () => {
      const result = _.isNumber(null)
      assert.isFalse(result)
    })
    test('returns false for undefined', () => {
      const result = _.isNumber(undefined)
      assert.isFalse(result)
    })
    test('returns false for boolean', () => {
      const result = _.isNumber(false)
      assert.isFalse(result)
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isNumber(new Data())
      assert.isFalse(result)
    })
    test('returns true for int', () => {
      const result = _.isNumber(22)
      assert.isTrue(result)
    })
    test('returns true for float', () => {
      const result = _.isNumber(22.0567)
      assert.isTrue(result)
    })
    test('returns false for NaN', () => {
      const result = _.isNumber(NaN)
      assert.isFalse(result)
    })
    test('returns false for array', () => {
      const result = _.isNumber([1, 2, 3])
      assert.isFalse(result)
    })
    test('returns false for object', () => {
      const result = _.isNumber({})
      assert.isFalse(result)
    })
    test('returns false for string', () => {
      const result = _.isNumber('abc')
      assert.isFalse(result)
    })
    test('returns false for string class', () => {
      const result = _.isNumber(String('abc'))
      assert.isFalse(result)
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
    test('returns true for int', () => {
      const result = _.isInt(22)
      assert.isTrue(result)
    })
    test('returns false for float', () => {
      const result = _.isInt(22.0567)
      assert.isFalse(result)
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
    test('returns false for int', () => {
      const result = _.isFloat(22)
      assert.isFalse(result)
    })
    test('returns true for float', () => {
      const result = _.isFloat(22.0567)
      assert.isTrue(result)
    })
  })

  describe('isEmpty function', () => {
    class Data {}
    class Person {
      name = 'ray'
    }
    test('returns true for empty values', () => {
      assert.isTrue(_.isEmpty(null))
      assert.isTrue(_.isEmpty(undefined))
      assert.isTrue(_.isEmpty(new Data()))
      assert.isTrue(_.isEmpty(0))
      assert.isTrue(_.isEmpty(true))
      assert.isTrue(_.isEmpty([]))
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
      assert.isFalse(_.isEmpty(new Person()))
      assert.isFalse(_.isEmpty({ name: 'x' }))
      assert.isFalse(_.isEmpty('abc'))
      assert.isFalse(_.isEmpty(String('abc')))
      assert.isFalse(_.isEmpty([1, 2, 3]))
      assert.isFalse(
        _.isEmpty(function work() {
          // do nothing
        })
      )
      assert.isFalse(
        _.isEmpty(() => {
          // do nothing
        })
      )
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
      assert.isFalse(
        _.isDate(function work() {
          // do nothing
        })
      )
      assert.isFalse(
        _.isDate(() => {
          // do nothing
        })
      )
      assert.isFalse(_.isDate(Symbol('')))
      assert.isFalse(_.isDate(Symbol('hello')))
    })
  })

  describe('isSymbol function', () => {
    test('returns false for null', () => {
      const input = null
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for undefined', () => {
      const input = undefined
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for empty class instance', () => {
      class Data {}
      const input = new Data()
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for class instance with properties', () => {
      class Data {
        name = 'ray'
      }
      const input = new Data()
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for number greater than 0', () => {
      const input = 22
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for number 0', () => {
      const input = 0
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for array with values', () => {
      const input = [1, 2, 3]
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for empty array', () => {
      const input: unknown[] = []
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for true', () => {
      const input = true
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for false', () => {
      const input = false
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for empty object', () => {
      const input = {}
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for object with values', () => {
      const input = { name: 'x' }
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for string with chars', () => {
      const input = 'abc'
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for empty string', () => {
      const input = ''
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for empty string class', () => {
      const input = ''
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for string class with chars', () => {
      const input = 'abc'
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns false for empty Map', () => {
      const input = new Map()
      const result = _.isSymbol(input)
      assert.isFalse(result)
    })
    test('returns true for empty Symbol', () => {
      const input = Symbol('')
      const result = _.isSymbol(input)
      assert.isTrue(result)
    })
    test('returns true for Symbol instance', () => {
      const input = Symbol('hello')
      const result = _.isSymbol(input)
      assert.isTrue(result)
    })
    test('returns false for Map with values', () => {
      const input = new Map()
      input.set('a', 1)
      input.set('b', 2)
      input.set('c', 3)
      const result = _.isSymbol(input)
      assert.isFalse(result)
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
