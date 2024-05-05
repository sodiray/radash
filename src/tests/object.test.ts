import { assert } from 'chai'
import * as _ from '..'

const NULL = null as unknown as {}

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
      const result = _.shake(
        {
          x: 2,
          y: null,
          z: undefined,
          o: false,
          r: 'x'
        },
        val => val !== 'x'
      )
      assert.deepEqual(result, {
        r: 'x'
      })
    })
    test('handles undefined input', () => {
      const result = _.shake(undefined as unknown as Object)
      assert.deepEqual(result, {})
    })
  })

  describe('mapKeys function', () => {
    test('runs all keys against mapper function', () => {
      const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
      const result = _.mapKeys(
        {
          x: 22,
          y: 8
        },
        prefixWith('x')
      )
      assert.deepEqual(result, {
        xx: 22,
        xy: 8
      })
    })
  })

  describe('mapValues function', () => {
    test('runs all values against mapper function', () => {
      const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
      const result = _.mapValues(
        {
          x: 'hi',
          y: 'bye'
        },
        prefixWith('x')
      )
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
        Bearer: 'value'
      })
      assert.deepEqual(result, {
        'x-api-key': 'value',
        bearer: 'value'
      })
    })
  })

  describe('upperize function', () => {
    test('changes all keys to upper case', () => {
      const result = _.upperize({
        'x-api-key': 'value',
        bearer: 'value'
      })
      assert.deepEqual(result, {
        'X-API-KEY': 'value',
        BEARER: 'value'
      })
    })
  })

  describe('clone function', () => {
    test('copies the primitives', () => {
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
        const newElm = _.clone(elm)
        assert.equal(elm, newElm)
      }
    })
    test('copies arrays', () => {
      const arr = [{ a: 0 }, 1, 2, 3]
      const result = _.clone(arr)

      assert.notEqual(arr, result)
      for (const i in result) {
        assert.equal(arr[i], result[i])
      }
    })
    test('copies functions', () => {
      const fa = () => 0
      const fb = _.clone(fa)

      assert.notEqual(fa, fb)
      assert.equal(fa(), fb())
    })
    test('copies objects (class instances) without losing the class type', () => {
      class Data {
        val = 0
      }

      const obj = new Data()
      obj.val = 1
      const result = _.clone(obj)

      assert.notEqual(obj, result)
      assert.equal(obj.constructor.name, result.constructor.name)
      assert.equal(obj.val, result.val)
    })
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
        public add(a: number, b: number) {
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
      type Index = 'one' | 'two'
      const obj: Record<Index, any> = {
        one: { name: 'ray' },
        two: { name: 'ash' }
      }
      const result = _.listify(obj, (key, value) => ({
        index: key,
        name: value.name
      }))
      assert.deepEqual(result, [
        { index: 'one', name: 'ray' },
        { index: 'two', name: 'ash' }
      ])
    })
  })

  describe('pick function', () => {
    test('handles null input', () => {
      const result = _.pick(null as unknown as Record<string, unknown>, [])
      assert.deepEqual(result, {})
    })
    test('handles empty keys', () => {
      const result = _.pick({ a: 2 }, [])
      assert.deepEqual(result, {})
    })
    test('handle key not in object', () => {
      const result = _.pick({ a: 2, b: 3 }, ['c'] as any)
      assert.deepEqual(result, {} as any)
    })
    test('handle one key not in object', () => {
      const result = _.pick({ a: 2, b: 3 }, ['a', 'c'] as any)
      assert.deepEqual(result, { a: 2 } as any)
    })
    test('does not ignore undefined values', () => {
      const result = _.pick({ a: 2, b: undefined }, ['b'])
      assert.deepEqual(result, { b: undefined })
    })
    test('returns picked properties only', () => {
      const result = _.pick({ a: 2, b: 4 }, ['a'])
      assert.deepEqual(result, {
        a: 2
      })
    })
    test('type: accepts an interface', () => {
      interface SomeDeclaredType {
        a: string
        b: Error
        c: number[]
      }
      const x: SomeDeclaredType = {
        a: 'alpha',
        b: new Error('beta'),
        c: [3]
      }
      const result = _.pick(x, ['a'])
      assert.deepEqual(result, {
        a: 'alpha'
      })
    })
    test('works with proxified objects', () => {
      const target = {
        a: 'hello',
        b: 'everyone'
      }
      const handler1 = {
        get() {
          return 'world'
        }
      }
      const proxified = new Proxy(target, handler1)
      const result = _.pick(proxified, ['a'])
      assert.deepEqual(result, {
        a: 'world'
      })
    })
    test('works with objects created without the prototype chain of Object e.g. by `Object.create(null)`', () => {
      const obj = Object.create(null)
      obj.a = 2
      obj.b = 4
      const result = _.pick(obj, ['a'])
      assert.deepEqual(result, {
        a: 2
      })
    })
    test('works with objects that have `hasOwnProperty` overwritten', () => {
      const obj = { a: 2, b: 4 }
      // @ts-ignore
      obj.hasOwnProperty = 'OVERWRITTEN'
      const result = _.pick(obj, ['a'])
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
      const result = _.omit(person, null as unknown as [])
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
      friends?: Person[]
    }
    const jay: Person = {
      name: 'jay',
      age: 17,
      friends: [
        {
          name: 'carl',
          age: 17,
          friends: [
            {
              name: 'sara',
              age: 17
            }
          ]
        }
      ]
    }
    test('handles null and undefined input', () => {
      assert.equal(_.get(null, 'name'), null)
      assert.equal(_.get(undefined, 'name'), null)
    })
    test('respects undefined as default value', () => {
      assert.equal(_.get({}, 'a.b.c', undefined), undefined)
    })
    test('returns specified value or default using path', () => {
      assert.equal(_.get({ age: undefined }, 'age', 22), 22)
      assert.equal(_.get(jay, 'friends[0].age'), 17)
      assert.equal(_.get(jay, 'friends["0"].age'), 17)
      assert.equal(_.get(jay, 'friends.0.age'), 17)
      assert.equal(_.get(jay, 'friends.1.age'), null)
      assert.equal(_.get(jay, 'friends.0.friends[0].name'), 'sara')
      assert.equal(_.get(jay, 'name'), 'jay')
      assert.equal(_.get(jay, '[name]'), 'jay')
      assert.equal(_.get(jay, '["name"]'), 'jay')
      assert.equal(_.get(jay, 'friends[0][name]'), 'carl')
      assert.equal(_.get(jay, 'friends[0].friends[0].friends[0].age', 22), 22)
    })
  })

  describe('mapEntries function', () => {
    const peopleByRole = {
      admin: 'jay',
      user: 'fey',
      guest: 'bray'
    }
    test('handles null input', () => {
      const result = _.mapEntries(
        NULL,
        null as unknown as (
          key: never,
          value: never
        ) => [string | number | symbol, unknown]
      )
      assert.deepEqual(result, {})
    })
    test('correctly maps keys and values', () => {
      const result = _.mapEntries(peopleByRole, (key, value) => [
        value,
        key.toUpperCase()
      ])
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
      const result = _.invert(NULL)
      assert.deepEqual(result, {})
    })
    test('correctly maps keys and values', () => {
      const result = _.invert(peopleByRole)
      assert.equal(result.jay, 'admin')
      assert.equal(result.fey, 'user')
      assert.equal(result.bray, 'guest')
    })
  })

  describe('assign function', () => {
    const initial = {
      name: 'jay',
      cards: ['ac'],
      location: {
        street: '23 main',
        state: {
          abbrv: 'FL',
          name: 'Florida'
        }
      }
    }
    const override = {
      name: 'charles',
      cards: ['4c'],
      location: {
        street: '8114 capo',
        state: {
          abbrv: 'TX',
          name: 'Texas'
        }
      }
    }
    test('handles both null input', () => {
      const result = _.assign(NULL, NULL)
      assert.deepEqual(result, {})
    })
    test('handles null first input', () => {
      const result = _.assign({ a: 'y' }, NULL)
      assert.deepEqual(result, { a: 'y' })
    })
    test('handles null last input', () => {
      const result = _.assign(NULL, { a: 'y' })
      assert.deepEqual(result, { a: 'y' })
    })
    test('correctly assign a with values from b', () => {
      const result = _.assign(initial, override)
      assert.deepEqual(result, override)
    })
    test('handles initial have unique value', () => {
      const result = _.assign({ a: 'x' }, {})
      assert.deepEqual(result, { a: 'x' })
    })
    test('handles override have unique value', () => {
      const result = _.assign({}, { b: 'y' })
      assert.deepEqual(result, { b: 'y' })
    })
  })

  describe('keys function', () => {
    test('handles bad input', () => {
      assert.deepEqual(_.keys({}), [])
      assert.deepEqual(_.keys(null as any), [])
      assert.deepEqual(_.keys(undefined as any), [])
    })
    test('returns correct list of keys', () => {
      const ra = {
        name: 'ra',
        power: 100,
        friend: {
          name: 'loki',
          power: 80
        },
        enemies: [
          {
            name: 'hathor',
            power: 12
          }
        ]
      }
      assert.deepEqual(_.keys(ra), [
        'name',
        'power',
        'friend.name',
        'friend.power',
        'enemies.0.name',
        'enemies.0.power'
      ])
    })
  })

  describe('set function', () => {
    test('handles bad input', () => {
      assert.deepEqual(_.set({}, '', {}), {})
      assert.deepEqual(_.set({}, null as any, {}), {})
      assert.deepEqual(_.set({}, '', null as any), {})
      assert.deepEqual(_.set(null as any, '', {}), {})
      assert.deepEqual(_.set(null as any, null as any, null as any), {})
      assert.deepEqual(_.set({ foo: true }, 'foo', false), { foo: false })
      assert.deepEqual(_.set({}, 'foo', 0), { foo: 0 })
    })
    test('sets deep values correctly', () => {
      assert.deepEqual(_.set({}, 'cards.value', 2), {
        cards: { value: 2 }
      })
      assert.deepEqual(_.set({}, 'cards.0.value', 2), {
        cards: [{ value: 2 }]
      })
      assert.deepEqual(_.set({}, 'cards.0.0.value', 2), {
        cards: [[{ value: 2 }]]
      })
      assert.deepEqual(_.set({}, 'cards.[0].[0].value', 2), {
        cards: [[{ value: 2 }]]
      })
      assert.deepEqual(_.set({}, 'cards.[1].[1].value', 2), {
        cards: [, [, { value: 2 }]]
      })
    })
  })

  describe('crush function', () => {
    test('handles bad input', () => {
      assert.deepEqual(_.crush({}), {})
      assert.deepEqual(_.crush(null as any), {})
      assert.deepEqual(_.crush(undefined as any), {})
    })
    test('returns correctly crushed object', () => {
      const now = new Date()
      const ra = {
        name: 'ra',
        power: 100,
        friend: {
          name: 'loki',
          power: 80
        },
        enemies: [
          {
            name: 'hathor',
            power: 12
          }
        ],
        timestamp: now
      }
      assert.deepEqual(_.crush(ra), {
        name: 'ra',
        power: 100,
        'friend.name': 'loki',
        'friend.power': 80,
        'enemies.0.name': 'hathor',
        'enemies.0.power': 12,
        timestamp: now
      })
    })
  })

  describe('construct function', () => {
    test('handles bad input', () => {
      assert.deepEqual(_.construct({}), {})
      assert.deepEqual(_.construct(null as any), {})
      assert.deepEqual(_.construct(undefined as any), {})
    })
    test('returns correctly constructed object', () => {
      const now = new Date()
      const ra = {
        name: 'ra',
        power: 100,
        friend: {
          name: 'loki',
          power: 80
        },
        enemies: [
          {
            name: 'hathor',
            power: 12
          },
          {
            name: 'vishnu',
            power: 58
          }
        ],
        timestamp: now
      }
      assert.deepEqual(
        _.construct({
          name: 'ra',
          power: 100,
          'friend.name': 'loki',
          'friend.power': 80,
          'enemies.0.name': 'hathor',
          'enemies.0.power': 12,
          'enemies.1.name': 'vishnu',
          'enemies.1.power': 58,
          timestamp: now
        }),
        ra
      )
    })
  })
})
