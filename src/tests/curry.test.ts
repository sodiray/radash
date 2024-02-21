import { assert } from 'chai'
import * as _ from '..'
import type { DebounceFunction } from '../curry'

describe('curry module', () => {
  describe('compose function', () => {
    test('composes functions', () => {
      const useZero = (fn: (num: number) => number) => () => fn(0)
      const objectize =
        (fn: (obj: { num: number }) => number) => (num: number) =>
          fn({ num })
      const increment =
        (fn: (arg: { num: number }) => number) =>
        ({ num }: { num: number }) =>
          fn({ num: num + 1 })
      const returnArg = (arg: 'num') => (args: { num: number }) => args[arg]

      const composed = _.compose(
        useZero,
        objectize,
        increment,
        increment,
        returnArg('num')
      )

      const decomposed = useZero(
        objectize(increment(increment(returnArg('num'))))
      )

      const expected = decomposed()
      const result = composed()

      assert.equal(result, expected)
      assert.equal(result, 2)
    })
    test('composes async function', async () => {
      const useZero = (fn: (num: number) => Promise<number>) => async () =>
        fn(0)
      const objectize =
        (fn: (obj: { num: number }) => Promise<number>) =>
        async (num: number) =>
          fn({ num })
      const increment =
        (fn: (arg: { num: number }) => Promise<number>) =>
        async ({ num }: { num: number }) =>
          fn({ num: num + 1 })
      const returnArg = (arg: 'num') => async (args: { num: number }) =>
        args[arg]

      const composed = _.compose(
        useZero,
        objectize,
        increment,
        increment,
        returnArg('num')
      )

      const decomposed = useZero(
        objectize(increment(increment(returnArg('num'))))
      )

      const expected = await decomposed()
      const result = await composed()

      assert.equal(result, expected)
    })
    test('composes function type overloads', () => {
      const useZero = (fn: (num: number) => number) => () => fn(0)
      const objectize =
        (fn: (obj: { num: number }) => number) => (num: number) =>
          fn({ num })
      const increment =
        (fn: (arg: { num: number }) => number) =>
        ({ num }: { num: number }) =>
          fn({ num: num + 1 })
      const returnArg = (arg: 'num') => (args: { num: number }) => args[arg]
      const returnNum = () => (num: number) => num

      assert.equal(_.compose(useZero, returnNum())(), 0)

      assert.equal(_.compose(useZero, objectize, returnArg('num'))(), 0)

      assert.equal(
        _.compose(useZero, objectize, increment, returnArg('num'))(),
        1
      )

      assert.equal(
        _.compose(useZero, objectize, increment, increment, returnArg('num'))(),
        2
      )

      assert.equal(
        _.compose(
          useZero,
          objectize,
          increment,
          increment,
          increment,
          returnArg('num')
        )(),
        3
      )

      assert.equal(
        _.compose(
          useZero,
          objectize,
          increment,
          increment,
          increment,
          increment,
          returnArg('num')
        )(),
        4
      )

      assert.equal(
        _.compose(
          useZero,
          objectize,
          increment,
          increment,
          increment,
          increment,
          increment,
          returnArg('num')
        )(),
        5
      )

      assert.equal(
        _.compose(
          useZero,
          objectize,
          increment,
          increment,
          increment,
          increment,
          increment,
          increment,
          returnArg('num')
        )(),
        6
      )

      assert.equal(
        _.compose(
          useZero,
          objectize,
          increment,
          increment,
          increment,
          increment,
          increment,
          increment,
          increment,
          returnArg('num')
        )(),
        7
      )
    })
  })

  describe('partial function', () => {
    test('passes single args', () => {
      const add = (a: number, b: number) => a + b
      const expected = 20
      const result = (_.partial(add, 10) as any)(10)
      assert.equal(result, expected)
    })
    test('passes many args', () => {
      const add = (...nums: number[]) => nums.reduce((a, b) => a + b, 0)
      const expected = 10
      const result = _.partial(add, 2, 2, 2)(2, 2)
      assert.equal(result, expected)
    })
  })

  describe('partob function', () => {
    test('partob passes single args', () => {
      const add = ({ a, b }: { a: number; b: number }) => a + b
      const expected = 20
      const result = _.partob(add, { a: 10 })({ b: 10 })
      assert.equal(result, expected)
    })
    test('partob overrides inital with later', () => {
      const add = ({ a, b }: { a: number; b: number }) => a + b
      const expected = 15
      const result = _.partob(add, { a: 10 })({ a: 5, b: 10 } as any)
      assert.equal(result, expected)
    })
  })

  describe('chain function', () => {
    test('calls all given functions', () => {
      const genesis = (num: number, name: string) => 0
      const addFive = (num: number) => num + 5
      const twoX = (num: number) => num * 2
      const func = _.chain(genesis, addFive, twoX)
      const result = func(0, '')
      assert.equal(result, 10)
    })

    test('calls add(1), then addFive, then twoX functions by 1', () => {
      const add = (y: number) => (x: number) => x + y
      const addFive = add(5)
      const twoX = (num: number) => num * 2
      const func = _.chain(add(1), addFive, twoX)
      const result = func(1)
      assert.equal(result, 14)
    })

    test('calls add(2), then addFive, then twoX, then repeatX functions by 1', () => {
      const add = (y: number) => (x: number) => x + y
      const addFive = add(5)
      const twoX = (num: number) => num * 2
      const repeatX = (num: number) => 'X'.repeat(num)
      const func = _.chain(add(2), addFive, twoX, repeatX)
      const result = func(1)
      assert.equal(result, 'XXXXXXXXXXXXXXXX')
    })

    test('calls addFive, then add(2), then twoX, then repeatX functions by 1', () => {
      const add = (y: number) => (x: number) => x + y
      const addFive = add(5)
      const twoX = (num: number) => num * 2
      const repeatX = (num: number) => 'X'.repeat(num)
      const func = _.chain(addFive, add(2), twoX, repeatX)
      const result = func(1)
      assert.equal(result, 'XXXXXXXXXXXXXXXX')
    })

    test('calls getName, then upperCase functions as a mapper for User[]', () => {
      type User = { id: number; name: string }
      const users: User[] = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'John Smith' },
        { id: 3, name: 'John Wick' }
      ]
      const getName = <T extends { name: string }>(item: T) => item.name
      const upperCase: (x: string) => Uppercase<string> = (text: string) =>
        text.toUpperCase() as Uppercase<string>

      const getUpperName = _.chain(getName, upperCase)
      const result = users.map(getUpperName)
      assert.deepEqual(result, ['JOHN DOE', 'JOHN SMITH', 'JOHN WICK'])
    })
  })

  describe('proxied function', () => {
    test('returns proxy that calls callback function', () => {
      const handler = (propertyName: string) => {
        if (propertyName === 'x') return 2
        if (propertyName === 'getName') return () => 'radash'
        return undefined
      }
      const proxy = _.proxied(handler) as any
      assert.equal(proxy.x, 2)
      assert.equal(proxy.getName(), 'radash')
      assert.isUndefined(proxy.nil)
    })
  })

  describe('memo function', () => {
    test('only executes function once', () => {
      const func = _.memo(() => new Date().getTime())
      const resultA = func()
      const resultB = func()
      assert.equal(resultA, resultB)
    })
    test('uses key to identify unique calls', () => {
      const func = _.memo(
        ({ id }: { id: string }) => {
          const ts = new Date().getTime()
          return `${ts}::${id}`
        },
        {
          key: ({ id }: { id: string }) => id
        }
      )
      const resultA = func({ id: 'alpha' })
      const resultB = func({ id: 'beta' })
      const resultA2 = func({ id: 'alpha' })
      assert.equal(resultA, resultA2)
      assert.notEqual(resultB, resultA)
    })
    test('calls function again when first value expires', async () => {
      const func = _.memo(() => new Date().getTime(), {
        ttl: 1
      })
      const resultA = func()
      await new Promise(res => setTimeout(res, 100))
      const resultB = func()
      assert.notEqual(resultA, resultB)
    })
    test('does not call function again when first value has not expired', async () => {
      const func = _.memo(() => new Date().getTime(), {
        ttl: 1000
      })
      const resultA = func()
      await new Promise(res => setTimeout(res, 100))
      const resultB = func()
      assert.equal(resultA, resultB)
    })
  })

  describe('debounce function', () => {
    let func: DebounceFunction<any>
    const mockFunc = jest.fn()
    const runFunc3Times = () => {
      func()
      func()
      func()
    }

    beforeEach(() => {
      func = _.debounce({ delay: 600 }, mockFunc)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('only executes once when called rapidly', async () => {
      runFunc3Times()
      expect(mockFunc).toHaveBeenCalledTimes(0)
      await _.sleep(610)
      expect(mockFunc).toHaveBeenCalledTimes(1)
    })

    test('does not debounce after cancel is called', () => {
      runFunc3Times()
      expect(mockFunc).toHaveBeenCalledTimes(0)
      func.cancel()
      runFunc3Times()
      expect(mockFunc).toHaveBeenCalledTimes(3)
      runFunc3Times()
      expect(mockFunc).toHaveBeenCalledTimes(6)
    })

    test('executes the function immediately when the flush method is called', () => {
      func.flush()
      expect(mockFunc).toHaveBeenCalledTimes(1)
    })

    test('continues to debounce after flush is called', async () => {
      runFunc3Times()
      expect(mockFunc).toHaveBeenCalledTimes(0)
      func.flush()
      expect(mockFunc).toHaveBeenCalledTimes(1)
      func()
      expect(mockFunc).toHaveBeenCalledTimes(1)
      await _.sleep(610)
      expect(mockFunc).toHaveBeenCalledTimes(2)
      func.flush()
      expect(mockFunc).toHaveBeenCalledTimes(3)
    })

    test('cancels all pending invocations when the cancel method is called', async () => {
      const results: boolean[] = []
      func()
      results.push(func.isPending())
      results.push(func.isPending())
      await _.sleep(610)
      results.push(func.isPending())
      func()
      results.push(func.isPending())
      await _.sleep(610)
      results.push(func.isPending())
      assert.deepEqual(results, [true, true, false, true, false])
    })

    test('returns if there is any pending invocation when the pending method is called', async () => {
      func()
      func.cancel()
      await _.sleep(610)
      expect(mockFunc).toHaveBeenCalledTimes(0)
    })
  })

  describe('throttle function', () => {
    test('throttles!', async () => {
      let calls = 0
      const func = _.throttle({ interval: 600 }, () => calls++)
      func()
      func()
      func()
      assert.equal(calls, 1)
      await _.sleep(610)
      func()
      func()
      func()
      assert.equal(calls, 2)
    })

    test('returns if the throttle is active', async () => {
      const results = []
      const func = _.throttle({ interval: 600 }, () => {})
      results.push(func.isThrottled())
      func()
      results.push(func.isThrottled())
      func()
      results.push(func.isThrottled())
      func()
      results.push(func.isThrottled())
      await _.sleep(610)
      results.push(func.isThrottled())
      assert.deepEqual(results, [false, true, true, true, false])
    })
  })
})

describe('callable function', () => {
  test('makes object callable', async () => {
    const request = {
      source: 'client',
      body: 'ford',
      doors: 2
    }

    const call = _.callable(request, self => (id: string) => ({ ...self, id }))

    expect(call.source).toBe('client')
    expect(call.body).toBe('ford')
    expect(call.doors).toBe(2)
    const s = call('23')
    expect(s.doors).toBe(2)
    expect(s.id).toBe('23')

    call.doors = 4
    expect(call.doors).toBe(4)
    const x = call('9')
    expect(x.doors).toBe(4)
    expect(x.id).toBe('9')
  })
})
