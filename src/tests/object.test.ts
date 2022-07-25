import { assert } from 'chai'
import * as _ from '..'


describe('object module', () => {

  describe('shake function', () => {
    test('removes all undefined values', () => {
      const result = _.shake({
        x: 2,
        y: null,
        z: undefined,
        o: false,
        r: 'x'
      })
      assert.deepEqual(result, {
        x: 2,
        y: null,
        o: false,
        r: 'x'
      })
    })
    test('removes values based on filter function input', () => {
      const result = _.shake({
        x: 2,
        y: null,
        z: undefined,
        o: false,
        r: 'x'
      }, val => val !== 'x')
      assert.deepEqual(result, {
        r: 'x'
      })
    })
    test('handles undefined input', () => {
      const result = _.shake(undefined)
      assert.deepEqual(result, {})
    })
  })

  describe('mapKeys function', () => {
    test('runs all keys against mapper function', () => {
      const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
      const result = _.mapKeys({
        x: 22,
        y: 8
      }, prefixWith('x'))
      assert.deepEqual(result, {
        xx: 22,
        xy: 8
      })
    })
  })

  describe('mapValues function', () => {
    test('runs all values against mapper function', () => {
      const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
      const result = _.mapValues({
        x: 'hi',
        y: 'bye'
      }, prefixWith('x'))
      assert.deepEqual(result, {
        x: 'xhi',
        y: 'xbye'
      })
    })
  })

  describe('lowerize function', () => {
    test('changes all keys to lower case', () => {
      const result = _.lowerize({
        'X-Api-Key': 'value',
        'Bearer': 'value'
      })
      assert.deepEqual(result, {
        'x-api-key': 'value',
        'bearer': 'value'
      })
    })
  })

  describe('upperize function', () => {
    test('changes all keys to upper case', () => {
      const result = _.upperize({
        'x-api-key': 'value',
        'bearer': 'value'
      })
      assert.deepEqual(result, {
        'X-API-KEY': 'value',
        'BEARER': 'value'
      })
    })
  })

  describe('clone function', () => {
    test('copies all attributes from object', () => {
      const obj = {
        x: 22,
        add: (a: number, b: number) => a + b,
        child: {
          key: 'yolo'
        }
      }
      const result = _.clone(obj)
      assert.equal(result.x, obj.x)
      assert.equal(result.add(2, 2), obj.add(2, 2))
      assert.equal(result.child.key, obj.child.key)
    })
    test('copies all attributes from class instance', () => {
      class Data {
        public x: number = 22
        public add (a: number, b: number) {
          return a + b
        }
        public child: any = {
          key: 'yolo'
        }
      }
      const result = _.clone(new Data())
      assert.equal(result.x, 22)
      // @warning will not copy functions from class instance
      // assert.equal(result.add(2, 2), 4)
      assert.equal(result.child.key, 'yolo')
    })
  })

  describe('listify function', () => {
    test('handles null input', () => {
      const result = _.listify(null as any as Record<string, string>, () => 1)
      assert.deepEqual(result, [])
    })
    test('handles empty object', () => {
      const result = _.listify({} as Record<string, string>, () => 1)
      assert.deepEqual(result, [])
    })
    test('calls toItem to convert to list', () => {
      const obj = {
        1: { name: 'ray' },
        2: { name: 'ash' }
      }
      const result = _.listify(obj, ({ value }) => value)
      assert.deepEqual(result, [
        { name: 'ray' },
        { name: 'ash' }
      ])
    })
  })
  
  describe('pick function', () => {
    test('handles null input', () => {
      const result = _.pick(null, [])
      assert.deepEqual(result, {})
    })
    test('handles empty keys', () => {
      const result = _.pick({ a: 2 }, [])
      assert.deepEqual(result, {})
    })
    test('returns picked properties only', () => {
      const result = _.pick({ a: 2, b: 4 }, ['a'])
      assert.deepEqual(result, {
        a: 2
      })
    })
  })

  describe('omit function', () => {
    const person = {
      name: 'jay',
      age: 20,
      active: true
    }
    test('handles null input', () => {
      const result = _.omit(null, [])
      assert.deepEqual(result, {})
    })
    test('handles empty keys', () => {
      const result = _.omit(person, [])
      assert.deepEqual(result, person)
    })
    test('handles null keys', () => {
      const result = _.omit(person, null)
      assert.deepEqual(result, person)
    })
    test('returns object without omitted properties', () => {
      const result = _.omit(person, ['name'])
      assert.deepEqual(result, {
        age: 20,
        active: true
      })
    })
  })
  
  describe('get function', () => {
    type Person = {
      name: string
      age: number
      friends: Person[]
    }
    const person: Person = {
      name: 'jay',
      age: 17,
      friends: [{
        name: 'chris',
        age: 19,
        friends: []
      }]
    }
    test('handles null input', () => {
      const result = _.get(null, x => x.name)
      assert.equal(result, null)
    })
    test('returns specified value', () => {
      const result = _.get(person, x => x.name)
      assert.equal(result, 'jay')
    })
    test('returns deep specified value', () => {
      const result = _.get(person, x => x.friends[0].age)
      assert.equal(result, 19)
    })
    test('returns default if value is undefined', () => {
      const myPerson = { ...person, age: undefined }
      const result = _.get(myPerson, x => x.age, 22)
      assert.equal(result, 22)
    })
    test('returns given default if failure', () => {
      const result = _.get(person, x => x.friends[0].friends[0].friends[0].age, 22)
      assert.equal(result, 22)
    })
  })

  describe('mapEntries function', () => {
    const peopleByRole = {
      admin: 'jay',
      user: 'fey',
      guest: 'bray'
    }
    test('handles null input', () => {
      const result = _.mapEntries(null, null, null)
      assert.deepEqual(result, {})
    })
    test('correctly maps keys and values', () => {
      const result = _.mapEntries(
        peopleByRole,
        x => x.value,
        x => x.key.toUpperCase()  
      )
      assert.equal(result.jay, 'ADMIN')
      assert.equal(result.fey, 'USER')
      assert.equal(result.bray, 'GUEST')
    })
  })
  
  describe('invert function', () => {
    const peopleByRole = {
      admin: 'jay',
      user: 'fey',
      guest: 'bray'
    }
    test('handles null input', () => {
      const result = _.invert(null)
      assert.deepEqual(result, {})
    })
    test('correctly maps keys and values', () => {
      const result = _.invert(peopleByRole)
      assert.equal(result.jay, 'admin')
      assert.equal(result.fey, 'user')
      assert.equal(result.bray, 'guest')
    })
  })

})
