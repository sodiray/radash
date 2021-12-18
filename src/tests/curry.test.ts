import { assert } from 'chai'
import _, { Defer } from '..'


describe('curry module', () => {

  describe('compose function', () => {
    test('composes functions', () => {
      const useZero = (fn: any) => () => fn(0)
      const objectize = (fn: any) => (num: any) => fn({ num })
      const incrament = (fn: any) => ({ num }: any) => fn({ num: num + 1 })
      const returnArg = (arg: any) => (args: any) => args[arg]

      const composed = _.compose(
        useZero,
        objectize,
        incrament,
        incrament,
        returnArg('num')
      )

      const decomposed = (
        useZero(
          objectize(
            incrament(
              incrament(
                returnArg('num'))))))

      const expected = decomposed()
      const result = composed()

      assert.equal(result, expected)
    })
    test('composes async function', async () => {

      const useZero = (fn: any) => async () => await fn(0)
      const objectize = (fn: any) => async (num: any) => await fn({ num })
      const incrament = (fn: any) => async ({ num }: any) => await fn({ num: num + 1 })
      const returnArg = (arg: any) => async (args: any) => await args[arg]

      const composed = _.compose(
        useZero,
        objectize,
        incrament,
        incrament,
        returnArg('num')
      )

      const decomposed = (
        useZero(
          objectize(
            incrament(
              incrament(
                returnArg('num'))))))

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
      const add = ({ a, b }: { a: number, b: number }) => a + b
      const expected = 20
      const result = _.partob(add, { a: 10 })({ b: 10 })
      assert.equal(result, expected)
    })
    test('partob overrides inital with later', () => {
      const add = ({ a, b }: { a: number, b: number }) => a + b
      const expected = 15
      const result = _.partob(add, { a: 10 })({ a: 5, b: 10 } as any)
      assert.equal(result, expected)
    })
  })

  describe('iter function', () => {
    test('iterates correct number of times', () => {
      const result = _.iter(5, (acc, idx) => acc + idx, 0)
      assert.equal(result, 15)
    })
  })

  describe('chain function', () => {
    test('calls all given functions', () => {
      const genesis = () => 0
      const addFive = (num: number) => num + 5
      const twoX = (num: number) => num * 2
      const func = _.chain(
        genesis,
        addFive,
        twoX
      )
      const result = func()
      assert.equal(result, 10)
    })
  })

  describe('tryit function', () => {
    test('returns error when error is thrown', async () => {
      const [err, result] = await _.tryit(async () => {
        throw new Error('not good enough')
      })()
      assert.isNull(result)
      assert.isNotNull(err)
      assert.equal(err.message, 'not good enough')
    })
    test('returns result when no error is thrown', async () => {
      const [err, result] = await _.tryit(async () => {
        return 'hello'
      })()
      assert.isNull(err)
      assert.isNotNull(result)
      assert.equal(result, 'hello')
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
      const func = _.memo(({ id }: { id: string }) => {
        const ts = new Date().getTime()
        return `${ts}::${id}`
      }, {
        key: ({ id }: { id: string }) => id
      })
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

  describe('defered function', () => {
    test('calls registered defer function', async () => {
      let val = 0
      await _.defered(async ({ defer }) => {
        defer(() => val = 1)
      })()
      assert.equal(val, 1)
    })
    test('returns the resulting value of the given function', async () => {
      let val = 0
      const result = await _.defered(async ({ defer }) => {
        defer(() => val = 1)
        return 'x'
      })()
      assert.equal(val, 1)
      assert.equal(result, 'x')
    })
    test('calls all registered defer functions', async () => {
      let one = 0
      let two = 0
      let three = 0
      const result = await _.defered(async ({ defer }) => {
        defer(() => one = 1)
        defer(() => two = 2)
        defer(() => three = 3)
        return 'x'
      })()
      assert.equal(one, 1)
      assert.equal(two, 2)
      assert.equal(three, 3)
      assert.equal(result, 'x')
    })
    test('calls all registered defer functions when error is thrown', async () => {
      let one = 0
      let two = 0
      let three = 0
      const func = _.defered(async ({ defer }) => {
        defer(() => one = 1)
        defer(() => two = 2)
        defer(() => three = 3)
        if (!!true) throw new Error('soooo broken')
        return 'x'
      })
      try {
        await func()
      } catch {}
      assert.equal(one, 1)
      assert.equal(two, 2)
      assert.equal(three, 3)
    })
    test('rethrows the error', async () => {
      let error: Error | null = null
      const func = _.defered(() => {
        throw new Error('soooo broken')
      })
      try {
        await func()
      } catch (err) { error = err }
      assert.isNotNull(error)
      assert.equal(error.message, 'soooo broken')
    })
    test('returns awaited async results', async () => {
      const func = _.defered(() => {
        return new Promise<string>((res) => res('x'))
      })
      const result = await func()
      assert.equal(result, 'x')
    })
    test('passes given arguments through to function', async () => {
      let one = 0
      const func = _.defered(({ defer, name }: { defer: Defer, name: string }) => {
        defer(() => one = 1)
        return new Promise<string>((res) => res(name))
      })
      const result = await func({
        name: 'radash'
      })
      assert.equal(one, 1)
      assert.equal(result, 'radash')
    })
  })

})