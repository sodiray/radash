import { assert } from 'chai'
import * as _ from '..'
import { DebounceFunction } from '../curry'

describe('curry module', () => {
  describe('compose function', () => {
    test('composes functions', () => {
      const useZero = (fn: any) => () => fn(0)
      const objectize = (fn: any) => (num: any) => fn({ num })
      const increment =
        (fn: any) =>
        ({ num }: any) =>
          fn({ num: num + 1 })
      const returnArg = (arg: any) => (args: any) => args[arg]

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
    })
    test('composes async function', async () => {
      const useZero = (fn: any) => async () => await fn(0)
      const objectize = (fn: any) => async (num: any) => await fn({ num })
      const increment =
        (fn: any) =>
        async ({ num }: any) =>
          await fn({ num: num + 1 })
      const returnArg = (arg: any) => async (args: any) => await args[arg]

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
  })

  describe('partial function', () => {
    test('passes single args', () => {
      const add = (a: number, b: number) => a + b
      const expected = 20
      const result = _.partial(add, 10)(10)
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
      const genesis = () => 0
      const addFive = (num: number) => num + 5
      const twoX = (num: number) => num * 2
      const func = _.chain(genesis, addFive, twoX)
      const result = func()
      assert.equal(result, 10)
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

    test('when we call the flush method it should execute the function immediately', () => {
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

    test('cancels all pending invocations when cancel is called', async () => {
      func()
      func.cancel()
      await _.sleep(610)
      expect(mockFunc).toHaveBeenCalledTimes(0)
    })
  })

  describe('throttle function', () => {
    test('', async () => {
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
