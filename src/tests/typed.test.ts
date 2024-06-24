import { expect } from 'vitest'
import * as _ from '..'

describe('typed module', () => {
  describe('isArray function', () => {
    test('returns false for null', () => {
      const result = _.isArray(null)
      expect(result).toBeFalsy()
    })
    test('returns false for undefined', () => {
      const result = _.isArray(undefined)
      expect(result).toBeFalsy()
    })
    test('returns false for boolean', () => {
      const result = _.isArray(false)
      expect(result).toBeFalsy()
    })
    test('returns false for object', () => {
      const result = _.isArray({})
      expect(result).toBeFalsy()
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isArray(new Data())
      expect(result).toBeFalsy()
    })
    test('returns false for number', () => {
      const result = _.isArray(22)
      expect(result).toBeFalsy()
    })
    test('returns false for string', () => {
      const result = _.isArray('abc')
      expect(result).toBeFalsy()
    })
    test('returns true for array', () => {
      const result = _.isArray([1, 2, 3])
      expect(result).toBeTruthy()
    })
    test('returns true for empty array', () => {
      const result = _.isArray([])
      expect(result).toBeTruthy()
    })
  })

  describe('isObject function', () => {
    test('returns false for null', () => {
      const result = _.isObject(null)
      expect(result).toBeFalsy()
    })
    test('returns false for undefined', () => {
      const result = _.isObject(undefined)
      expect(result).toBeFalsy()
    })
    test('returns false for boolean', () => {
      const result = _.isObject(false)
      expect(result).toBeFalsy()
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isObject(new Data())
      expect(result).toBeFalsy()
    })
    test('returns false for number', () => {
      const result = _.isObject(22)
      expect(result).toBeFalsy()
    })
    test('returns false for string', () => {
      const result = _.isObject('abc')
      expect(result).toBeFalsy()
    })
    test('returns false for array', () => {
      const result = _.isObject([1, 2, 3])
      expect(result).toBeFalsy()
    })
    test('returns true for object', () => {
      const result = _.isObject({})
      expect(result).toBeTruthy()
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
        expect(_.isPrimitive(elm)).toBeTruthy()
      }
    }),
      test('returns false for non-primitives', () => {
        const arr = [new Date(), Number, {}, Object({}), () => 0, [1, 2]]

        for (const elm of arr) {
          expect(_.isPrimitive(elm)).toBeFalsy()
        }
      })
  })

  describe('isFunction function', () => {
    test('returns false for null', () => {
      const result = _.isFunction(null)
      expect(result).toBeFalsy()
    })
    test('returns false for undefined', () => {
      const result = _.isFunction(undefined)
      expect(result).toBeFalsy()
    })
    test('returns false for boolean', () => {
      const result = _.isFunction(false)
      expect(result).toBeFalsy()
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isFunction(new Data())
      expect(result).toBeFalsy()
    })
    test('returns false for number', () => {
      const result = _.isFunction(22)
      expect(result).toBeFalsy()
    })
    test('returns false for string', () => {
      const result = _.isFunction('abc')
      expect(result).toBeFalsy()
    })
    test('returns false for array', () => {
      const result = _.isFunction([1, 2, 3])
      expect(result).toBeFalsy()
    })
    test('returns false for object', () => {
      const result = _.isFunction({})
      expect(result).toBeFalsy()
    })
    test('returns true for anonymous function', () => {
      const result = _.isFunction(function () {
        return 'hello'
      })
      expect(result).toBeTruthy()
    })
    test('returns true for arrow function', () => {
      const result = _.isFunction(() => {
        return 'hello'
      })
      expect(result).toBeTruthy()
    })
    test('returns true for named function', () => {
      function sayHello() {
        return 'hello'
      }
      const result = _.isFunction(sayHello)
      expect(result).toBeTruthy()
    })
  })

  describe('isString function', () => {
    test('returns false for null', () => {
      const result = _.isString(null)
      expect(result).toBeFalsy()
    })
    test('returns false for undefined', () => {
      const result = _.isString(undefined)
      expect(result).toBeFalsy()
    })
    test('returns false for boolean', () => {
      const result = _.isString(false)
      expect(result).toBeFalsy()
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isString(new Data())
      expect(result).toBeFalsy()
    })
    test('returns false for number', () => {
      const result = _.isString(22)
      expect(result).toBeFalsy()
    })
    test('returns false for array', () => {
      const result = _.isString([1, 2, 3])
      expect(result).toBeFalsy()
    })
    test('returns false for object', () => {
      const result = _.isString({})
      expect(result).toBeFalsy()
    })
    test('returns true for string', () => {
      const result = _.isString('abc')
      expect(result).toBeTruthy()
    })
    test('returns true for string class', () => {
      const result = _.isString(String('abc'))
      expect(result).toBeTruthy()
    })
  })

  describe('isNumber function', () => {
    test('returns false for null', () => {
      const result = _.isNumber(null)
      expect(result).toBeFalsy()
    })
    test('returns false for undefined', () => {
      const result = _.isNumber(undefined)
      expect(result).toBeFalsy()
    })
    test('returns false for boolean', () => {
      const result = _.isNumber(false)
      expect(result).toBeFalsy()
    })
    test('returns false for class instance', () => {
      class Data {}
      const result = _.isNumber(new Data())
      expect(result).toBeFalsy()
    })
    test('returns true for int', () => {
      const result = _.isNumber(22)
      expect(result).toBeTruthy()
    })
    test('returns true for float', () => {
      const result = _.isNumber(22.0567)
      expect(result).toBeTruthy()
    })
    test('returns false for NaN', () => {
      const result = _.isNumber(NaN)
      expect(result).toBeFalsy()
    })
    test('returns false for array', () => {
      const result = _.isNumber([1, 2, 3])
      expect(result).toBeFalsy()
    })
    test('returns false for object', () => {
      const result = _.isNumber({})
      expect(result).toBeFalsy()
    })
    test('returns false for string', () => {
      const result = _.isNumber('abc')
      expect(result).toBeFalsy()
    })
    test('returns false for string class', () => {
      const result = _.isNumber(String('abc'))
      expect(result).toBeFalsy()
    })
  })

  describe('isInt function', () => {
    class Data {}
    test('returns false for non-number values', () => {
      expect(_.isInt(undefined)).toBeFalsy()
      expect(_.isInt(null)).toBeFalsy()
      expect(_.isInt(false)).toBeFalsy()
      expect(_.isInt(new Data())).toBeFalsy()
      expect(_.isInt(NaN)).toBeFalsy()
      expect(_.isInt([1, 2, 3])).toBeFalsy()
      expect(_.isInt({})).toBeFalsy()
      expect(_.isInt('abc')).toBeFalsy()
      expect(_.isInt(String('abc'))).toBeFalsy()
    })
    test('returns true for int', () => {
      const result = _.isInt(22)
      expect(result).toBeTruthy()
    })
    test('returns false for float', () => {
      const result = _.isInt(22.0567)
      expect(result).toBeFalsy()
    })
  })

  describe('isIntString function', () => {
    test('returns true for int string', () => {
      expect(_.isIntString('0')).toBeTruthy()
      expect(_.isIntString('22')).toBeTruthy()
      expect(_.isIntString('-22')).toBeTruthy()
      expect(_.isIntString('1e+28')).toBeTruthy()
    })
    test('returns false for decimal string', () => {
      expect(_.isIntString('22.0567')).toBeFalsy()
      expect(_.isIntString('22.0')).toBeFalsy()
    })
    test('returns false for leading + symbol', () => {
      expect(_.isIntString('+22')).toBeFalsy()
    })
    test('returns false for non-numeric string', () => {
      expect(_.isIntString('abc')).toBeFalsy()
      expect(_.isIntString('')).toBeFalsy()
    })
    test('returns false for non-string values', () => {
      expect(_.isIntString(22)).toBeFalsy()
      expect(_.isIntString(true)).toBeFalsy()
      expect(_.isIntString(null)).toBeFalsy()
      expect(_.isIntString(NaN)).toBeFalsy()
    })
  })

  describe('isFloat function', () => {
    class Data {}
    test('returns false for non-number values', () => {
      expect(_.isFloat(undefined)).toBeFalsy()
      expect(_.isFloat(null)).toBeFalsy()
      expect(_.isFloat(false)).toBeFalsy()
      expect(_.isFloat(new Data())).toBeFalsy()
      expect(_.isFloat(NaN)).toBeFalsy()
      expect(_.isFloat([1, 2, 3])).toBeFalsy()
      expect(_.isFloat({})).toBeFalsy()
      expect(_.isFloat('abc')).toBeFalsy()
      expect(_.isFloat(String('abc'))).toBeFalsy()
    })
    test('returns false for int', () => {
      const result = _.isFloat(22)
      expect(result).toBeFalsy()
    })
    test('returns true for float', () => {
      const result = _.isFloat(22.0567)
      expect(result).toBeTruthy()
    })
  })

  describe('isEmpty function', () => {
    class Data {}
    class Person {
      name: string = 'ray'
    }
    test('returns true for empty values', () => {
      expect(_.isEmpty(null)).toBeTruthy()
      expect(_.isEmpty(undefined)).toBeTruthy()
      expect(_.isEmpty(new Data())).toBeTruthy()
      expect(_.isEmpty(0)).toBeTruthy()
      expect(_.isEmpty(true)).toBeTruthy()
      expect(_.isEmpty([])).toBeTruthy()
      expect(_.isEmpty(false)).toBeTruthy()
      expect(_.isEmpty({})).toBeTruthy()
      expect(_.isEmpty('')).toBeTruthy()
      expect(_.isEmpty(String())).toBeTruthy()
      expect(_.isEmpty(new Map())).toBeTruthy()
      expect(_.isEmpty(new Date('invalid value'))).toBeTruthy()
    })
    test('returns false for non-empty values', () => {
      expect(_.isEmpty(new Date())).toBeFalsy()
      expect(_.isEmpty(new Date('2022-09-01T02:19:55.976Z'))).toBeFalsy()
      expect(_.isEmpty(22)).toBeFalsy()
      expect(_.isEmpty(new Person())).toBeFalsy()
      expect(_.isEmpty({ name: 'x' })).toBeFalsy()
      expect(_.isEmpty('abc')).toBeFalsy()
      expect(_.isEmpty(String('abc'))).toBeFalsy()
      expect(_.isEmpty([1, 2, 3])).toBeFalsy()
      expect(_.isEmpty(function work() {})).toBeFalsy()
      expect(_.isEmpty(() => {})).toBeFalsy()
      expect(_.isEmpty(Symbol(''))).toBeFalsy()
      expect(_.isEmpty(Symbol('hello'))).toBeFalsy()
      const map = new Map()
      map.set('a', 1)
      expect(_.isEmpty(map)).toBeFalsy()
    })
  })

  describe('isDate function', () => {
    test('return true for Date values', () => {
      expect(_.isDate(new Date())).toBeTruthy()
      expect(_.isDate(new Date('2022-09-01T02:19:55.976Z'))).toBeTruthy()
      expect(_.isDate(new Date('invalid value'))).toBeTruthy()
    })
    test('return false for non-Date values', () => {
      expect(_.isDate(22)).toBeFalsy()
      expect(_.isDate({ name: 'x' })).toBeFalsy()
      expect(_.isDate('abc')).toBeFalsy()
      expect(_.isDate(String('abc'))).toBeFalsy()
      expect(_.isDate([1, 2, 3])).toBeFalsy()
      expect(_.isDate(function work() {})).toBeFalsy()
      expect(_.isDate(() => {})).toBeFalsy()
      expect(_.isDate(Symbol(''))).toBeFalsy()
      expect(_.isDate(Symbol('hello'))).toBeFalsy()
    })
  })

  describe('isPromise function', () => {
    test('return true for Promise values', () => {
      expect(_.isPromise(new Promise(res => res(0)))).toBeTruthy()
      expect(_.isPromise(new Promise(res => res('')))).toBeTruthy()
      expect(_.isPromise((async () => {})())).toBeTruthy()
    })
    test('return false for non-Date values', () => {
      expect(_.isPromise(22)).toBeFalsy()
      expect(_.isPromise({ name: 'x' })).toBeFalsy()
      expect(_.isPromise('abc')).toBeFalsy()
      expect(_.isPromise(String('abc'))).toBeFalsy()
      expect(_.isPromise([1, 2, 3])).toBeFalsy()
      expect(_.isPromise(function work() {})).toBeFalsy()
      expect(_.isPromise(() => {})).toBeFalsy()
      expect(_.isPromise(Symbol(''))).toBeFalsy()
      expect(_.isPromise(Symbol('hello'))).toBeFalsy()
      expect(_.isPromise({ then: 2 })).toBeFalsy()
    })
  })

  describe('isSymbol function', () => {
    test('returns false for null', () => {
      const input = null
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for undefined', () => {
      const input = undefined
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for empty class instance', () => {
      class Data {}
      const input = new Data()
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for class instance with properties', () => {
      class Data {
        name: string = 'ray'
      }
      const input = new Data()
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for number greater than 0', () => {
      const input = 22
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for number 0', () => {
      const input = 0
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for array with values', () => {
      const input = [1, 2, 3]
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for empty array', () => {
      const input: unknown[] = []
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for true', () => {
      const input = true
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for false', () => {
      const input = false
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for empty object', () => {
      const input = {}
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for object with values', () => {
      const input = { name: 'x' }
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for string with chars', () => {
      const input = 'abc'
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for empty string', () => {
      const input = ''
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for empty string class', () => {
      const input = ''
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for string class with chars', () => {
      const input = 'abc'
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns false for empty Map', () => {
      const input = new Map()
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
    })
    test('returns true for empty Symbol', () => {
      const input = Symbol('')
      const result = _.isSymbol(input)
      expect(result).toBeTruthy()
    })
    test('returns true for Symbol instance', () => {
      const input = Symbol('hello')
      const result = _.isSymbol(input)
      expect(result).toBeTruthy()
    })
    test('returns false for Map with values', () => {
      const input = new Map()
      input.set('a', 1)
      input.set('b', 2)
      input.set('c', 3)
      const result = _.isSymbol(input)
      expect(result).toBeFalsy()
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
      expect(_.isEqual(0, 0)).toBeTruthy()
      expect(_.isEqual('a', 'a')).toBeTruthy()
      const hello = Symbol('hello')
      expect(_.isEqual(hello, hello)).toBeTruthy()
      expect(_.isEqual({}, {})).toBeTruthy()
      expect(_.isEqual(true, true)).toBeTruthy()
      expect(_.isEqual(new RegExp(/a*s/), new RegExp(/a*s/))).toBeTruthy()
      const now = new Date()
      expect(_.isEqual(now, now)).toBeTruthy()
      expect(_.isEqual([], [])).toBeTruthy()
      expect(_.isEqual(complex, { ...complex })).toBeTruthy()
      expect(
        _.isEqual([complex, complex], [{ ...complex }, { ...complex }])
      ).toBeTruthy()
    })
    test('returns false for non-equal things', () => {
      expect(_.isEqual(0, 1)).toBeFalsy()
      expect(_.isEqual('a', 'b')).toBeFalsy()
      expect(_.isEqual(new RegExp(/^http:/), new RegExp(/https/))).toBeFalsy()
      expect(_.isEqual(Symbol('hello'), Symbol('goodbye'))).toBeFalsy()
      expect(_.isEqual({ z: 23 }, { a: 1 })).toBeFalsy()
      expect(_.isEqual(true, false)).toBeFalsy()
      expect(
        _.isEqual(new Date(), new Date('2022-09-01T03:25:12.750Z'))
      ).toBeFalsy()
      expect(_.isEqual([], [1])).toBeFalsy()
      expect(_.isEqual(complex, { ...complex, num: 222 })).toBeFalsy()
      expect(_.isEqual([complex], [{ ...complex, num: 222 }])).toBeFalsy()
    })
  })
})
