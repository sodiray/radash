import { expect, vi } from 'vitest'
import * as _ from '..'
import { AggregateError } from '../async'

describe('async module', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  describe('asyncReduce function', () => {
    test('returns result of reducer', async () => {
      const numbers = [
        0,
        1,
        2,
        3,
        4 // => 10
      ]
      const asyncSum = async (a: number, b: number): Promise<number> => {
        return new Promise(res => res(a + b))
      }
      const result = await _.reduce<number, number>(numbers, asyncSum, 0)
      expect(result).toBe(10)
    })
    test('passes correct indexes', async () => {
      const array = ['a', 'b', 'c', 'd', 'e']
      const asyncSumIndex = async (
        a: number[],
        b: string,
        i: number
      ): Promise<number[]> => {
        return new Promise(res => {
          a.push(i)
          res(a)
        })
      }
      const result = await _.reduce<string, number[]>(array, asyncSumIndex, [])
      expect(result).toEqual([0, 1, 2, 3, 4])
    })
  })

  describe('asyncMap function', () => {
    test('returns result of mapper', async () => {
      const numbers = [1, 2, 3, 4]
      const asyncSquare = async (a: number): Promise<number> => {
        return new Promise(res => res(a * a))
      }
      const result = await _.map<number, number>(numbers, asyncSquare)
      expect(result).toEqual([1, 4, 9, 16])
    })

    test('handles null input', async () => {
      const result = await _.map(null as unknown as unknown[], async () => '')
      expect(result).toEqual([])
    })

    test('passes correct indexes', async () => {
      const array = ['a', 'b', 'c', 'd']
      const mapper = async (l: string, index: number) => `${l}${index}`
      const result = await _.map(array, mapper)
      expect(result).toEqual(['a0', 'b1', 'c2', 'd3'])
    })
  })

  describe('reduce/asyncReduceV2 function', () => {
    const numbers = [0, 1, 2, 3, 4]
    const reducer = async (a: number, b: number): Promise<number> => {
      return new Promise(res => res(a + b))
    }

    test('calls asyncReduce', async () => {
      const result = await _.reduce<number, number>(numbers, reducer, 0)
      expect(result).toBe(10)
    })
    test('uses first item in array when no init provided', async () => {
      const result = await _.reduce(numbers, reducer)
      expect(result).toBe(10)
    })
    test('throws on no init value and an empty array', async () => {
      try {
        await _.reduce([], reducer)
      } catch (err) {
        expect(err).not.toBeNull()
        return
      }
      expect.fail('Expected error to be thrown')
    })
    test('throws on no init value and a null array input', async () => {
      try {
        await _.reduce(null as unknown as number[], reducer)
      } catch (err) {
        expect(err).not.toBeNull()
        return
      }
      expect.fail('Expected error to be thrown')
    })
  })

  describe('defer function', () => {
    test('calls registered defer function', async () => {
      let val = 0
      await _.defer(async defer => {
        defer(() => {
          val = 1
        })
      })
      expect(val).toBe(1)
    })
    test('returns the resulting value of the given function', async () => {
      let val = 0
      const result = await _.defer(async defer => {
        defer(() => {
          val = 1
        })
        return 'x'
      })
      expect(val).toBe(1)
      expect(result).toBe('x')
    })
    test('calls all registered defer functions', async () => {
      let one = 0
      let two = 0
      let three = 0
      const result = await _.defer(async defer => {
        defer(async () => {
          one = 1
        })
        defer(async () => {
          two = 2
        })
        defer(async () => {
          three = 3
        })
        return 'x'
      })
      expect(one).toBe(1)
      expect(two).toBe(2)
      expect(three).toBe(3)
      expect(result).toBe('x')
    })
    test('calls all registered defer functions when error is thrown', async () => {
      let one = 0
      let two = 0
      let three = 0
      try {
        await _.defer(async defer => {
          defer(async () => {
            one = 1
          })
          defer(async () => {
            two = 2
          })
          defer(async () => {
            three = 3
          })
          if (!!true) throw new Error('soooo broken')
          return 'x'
        })
      } catch {}
      expect(one).toBe(1)
      expect(two).toBe(2)
      expect(three).toBe(3)
    })
    test('throws the error', async () => {
      let error: Error | null = null
      try {
        await _.defer(async () => {
          throw new Error('soooo broken')
        })
      } catch (err: any) {
        error = err
      }
      expect(error).not.toBeNull()
      expect(error?.message).toBe('soooo broken')
    })
    test('rethrows the rethrown error when rethrow is true', async () => {
      let error: Error | null = null
      try {
        await _.defer(async register => {
          register(
            async () => {
              throw new Error('soooo broken')
            },
            { rethrow: true }
          )
        })
      } catch (err: any) {
        error = err
      }
      expect(error).not.toBeNull()
      expect(error?.message).toBe('soooo broken')
    })
    test('does not rethrow the rethrown error when rethrow is false', async () => {
      let error: Error | null = null
      try {
        await _.defer(async register => {
          register(
            async () => {
              throw new Error('soooo broken')
            },
            { rethrow: false }
          )
        })
      } catch (err: any) {
        error = err
      }
      expect(error).toBeNull()
    })
    test('does not rethrow the rethrown error by default', async () => {
      let error: Error | null = null
      try {
        await _.defer(async register => {
          register(async () => {
            throw new Error('soooo broken')
          })
        })
      } catch (err: any) {
        error = err
      }
      expect(error).toBeNull()
    })
    test('returns awaited async results', async () => {
      const result = await _.defer(() => {
        return new Promise<string>(res => res('x'))
      })
      expect(result).toBe('x')
    })
  })

  describe('_.try function', () => {
    test('returns error when error is thrown', async () => {
      const fn = _.try(async () => {
        throw new Error('not good enough')
      })
      const [err, result] = await fn()
      expect(result).toBeUndefined()
      expect(err).not.toBeNull()
      expect(err!.message).toBe('not good enough')
    })
    test('returns result when no error is thrown', async () => {
      const [err, result] = await _.try(async () => {
        return 'hello'
      })()
      expect(err).toBeUndefined()
      expect(result).not.toBeNull()
      expect(result).toBe('hello')
    })
    test('handles non-async function results', async () => {
      const [err, result] = _.try(() => {
        return 'hello'
      })()
      expect(err).toBeUndefined()
      expect(result).not.toBeNull()
      expect(result).toBe('hello')
    })
    test('handles non-async function errors', async () => {
      const [err, result] = _.try(() => {
        if (1 < 0) return ''
        throw new Error('unknown')
      })()
      expect(result).toBeUndefined()
      expect(err).not.toBeNull()
      expect(err!.message).toBe('unknown')
    })
    test('alias exists', () => {
      expect(_.tryit).not.toBeNull()
    })
  })

  describe('_.sleep function', () => {
    test('suspends a thread for a specified number of milliseconds', async () => {
      const ONE_SECOND = 1000
      const before = Date.now()
      await _.sleep(ONE_SECOND)
      const after = Date.now()
      expect(after).toBeGreaterThanOrEqual(before + ONE_SECOND)
    })
  })

  describe('AggregateError error', () => {
    const fakeWork = (name?: string) => {
      const fakeJob = () => {
        const fakeTask = () => {
          const fakeMicrotask = () => {
            const err = new Error()
            err.name = name ?? 'MicrotaskError'
            throw err
          }
          return fakeMicrotask()
        }
        return fakeTask()
      }
      return fakeJob()
    }
    test('uses stack from the first given error', () => {
      const errors: Error[] = []
      try {
        fakeWork()
      } catch (e) {
        errors.push(e as Error)
      }
      const aggregate = new AggregateError(errors)
      expect(aggregate.stack).toContain('at fakeMicrotask')
      expect(aggregate.message).toContain('with 1')
    })
    test('uses stack from first error with a stack', () => {
      const errors: Error[] = [{} as Error]
      try {
        fakeWork()
      } catch (e) {
        errors.push(e as Error)
      }
      const aggregate = new AggregateError(errors)
      expect(aggregate.name).toBe('AggregateError(MicrotaskError...)')
      expect(aggregate.stack).toContain('at fakeMicrotask')
      expect(aggregate.message).toContain('with 2')
    })
    test('does not fail if no errors given', () => {
      new AggregateError([])
      new AggregateError(undefined as unknown as Error[])
    })
  })

  describe('_.parallel function', () => {
    test('returns all results from all functions', async () => {
      const [errors, results] = await _.try(async () => {
        return _.parallel(1, _.list(1, 3), async num => {
          await _.sleep(1000)
          return `hi_${num}`
        })
      })()
      expect(errors).toBeUndefined()
      expect(results).toEqual(['hi_1', 'hi_2', 'hi_3'])
    })
    test('throws erros as array of all errors', async () => {
      const [error, results] = await _.try(async () => {
        return _.parallel(1, _.list(1, 3), async num => {
          await _.sleep(1000)
          if (num === 2) throw new Error('number is 2')
          return `hi_${num}`
        })
      })()
      const err = error as AggregateError
      expect(results).toBeUndefined()
      expect(err.errors.length).toBe(1)
      expect(err.errors[0].message).toBe('number is 2')
    })
    test('does not run more than the limit at once', async () => {
      let numInProgress = 0
      const tracking: number[] = []
      await _.parallel(3, _.list(1, 14), async () => {
        numInProgress++
        tracking.push(numInProgress)
        await _.sleep(300)
        numInProgress--
      })
      expect(Math.max(...tracking)).toBe(3)
    })
  })

  describe('_.retry', () => {
    type Options = {
      times?: number
      delay?: number | null
      backoff?: (count: number) => number
    }

    const NULL = null as unknown as Options

    test('returns result of given function', async () => {
      const result = await _.retry(NULL, async bail => {
        return 'hello'
      })
      expect(result).toBe('hello')
    })
    test('simple + quick + happy path', async () => {
      const result = await _.retry(NULL, async () => {
        return 'hello'
      })
      expect(result).toBe('hello')
    })
    test('retries on failure', async () => {
      let failedOnce = false
      const result = await _.retry(NULL, async bail => {
        if (!failedOnce) {
          failedOnce = true
          throw 'Failing for test'
        }
        return 'hello'
      })
      expect(result).toBe('hello')
    })
    test('quits on bail', async () => {
      try {
        await _.retry({}, async bail => {
          bail('iquit')
        })
      } catch (err) {
        expect(err).toBe('iquit')
        return
      }
      expect.fail('error should have been thrown')
    })
    test('quits after max retries', async () => {
      try {
        await _.retry({}, async () => {
          throw 'quitagain'
        })
      } catch (err) {
        expect(err).toBe('quitagain')
        return
      }
      expect.fail('error should have been thrown')
    })
    test('quits after max retries without delay', async () => {
      try {
        const func = async () => {
          throw 'quitagain'
        }
        await _.retry({ times: 3 }, func)
      } catch (err) {
        expect(err).toBe('quitagain')
        return
      }
      expect.fail('error should have been thrown')
    })
    test('quits after max retries with delay', async () => {
      try {
        const func = async () => {
          throw 'quitagain'
        }
        await _.retry({ delay: 100 }, func)
      } catch (err) {
        expect(err).toBe('quitagain')
        return
      }
      expect.fail('error should have been thrown')
    })
    test('uses backoff between retries', async () => {
      let count = 0
      let backoffs: number = 0
      const start = Date.now()
      await _.retry(
        {
          times: 3,
          backoff: i => {
            backoffs += i ** 10
            return i ** 10
          }
        },
        async () => {
          count++
          if (count < 3) throw 'error'
        }
      )
      const diff = Date.now() - start
      expect(count).toBe(3)
      // Time taken should at least be the
      // total ms backed off. Using exponential
      // backoff (above) 3 times (passing on
      // the third try) that is:
      //   - 10**1 + 10**2 = 1025
      // The performance typically comes in 1
      // or 2 milliseconds after.
      expect(diff).toBeGreaterThanOrEqual(backoffs)
    })
  })

  describe('_.guard', () => {
    it('returns result of given async function', async () => {
      const result = await _.guard(async () => {
        return 'hello'
      })
      expect(result).toBe('hello')
    })
    it('returns result of given sync function', async () => {
      const result = _.guard(() => {
        return 'hello'
      })
      expect(result).toBe('hello')
    })
    it('returns error if given async function throws', async () => {
      const result =
        (await _.guard(async () => {
          throw new Error('error')
        })) ?? 'good-bye'
      expect(result).toBe('good-bye')
    })
    it('returns error if given sync function throws', async () => {
      const alwaysThrow = () => {
        if (1 > 0) throw new Error('error')
        return undefined
      }
      const result = _.guard(alwaysThrow) ?? 'good-bye'
      expect(result).toBe('good-bye')
    })
    it('throws error if shouldGuard returns false', async () => {
      const makeFetchUser = (id: number) => {
        return async () => {
          if (id === 1) return 'user1'
          if (id === 2) throw new Error('user not found')
          throw new Error('unknown error')
        }
      }
      const isUserNotFoundErr = (err: any) => err.message === 'user not found'
      const fetchUser = async (id: number) =>
        (await _.guard(makeFetchUser(id), isUserNotFoundErr)) ?? 'default-user'

      const user1 = await fetchUser(1)
      expect(user1).toBe('user1')

      const user2 = await fetchUser(2)
      expect(user2).toBe('default-user')

      try {
        await fetchUser(3)
        expect.fail()
      } catch (err: any) {
        expect(err.message).toBe('unknown error')
      }
    })
  })

  describe('_.all', () => {
    const promise = {
      resolve: <T>(value: T) => new Promise<T>(res => res(value)),
      reject: (err: any) => new Promise((res, rej) => rej(err))
    }
    it('returns array with values in correct order when given array', async () => {
      const result = await _.all([
        promise.resolve(22),
        promise.resolve('hello'),
        promise.resolve({ name: 'ray' })
      ])
      expect(result).toEqual([22, 'hello', { name: 'ray' }])
    })
    it('returns object with values in correct keys when given object', async () => {
      const result = await _.all({
        num: promise.resolve(22),
        str: promise.resolve('hello'),
        obj: promise.resolve({ name: 'ray' })
      })
      expect(result).toEqual({
        num: 22,
        str: 'hello',
        obj: { name: 'ray' }
      })
    })
    it('throws aggregate error when a single promise fails (in object mode)', async () => {
      try {
        await _.all({
          num: promise.resolve(22),
          str: promise.resolve('hello'),
          err: promise.reject(new Error('broken'))
        })
      } catch (e: any) {
        const err = e as AggregateError
        expect(err.errors.length).toBe(1)
        expect(err.errors[0].message).toBe('broken')
        return
      }
      expect.fail('Expected error to be thrown but it was not')
    })
    it('throws aggregate error when a single promise fails (in array mode)', async () => {
      try {
        await _.all([
          promise.resolve(22),
          promise.resolve('hello'),
          promise.reject(new Error('broken'))
        ])
      } catch (e: any) {
        const err = e as AggregateError
        expect(err.errors.length).toBe(1)
        expect(err.errors[0].message).toBe('broken')
        return
      }
      expect.fail('Expected error to be thrown but it was not')
    })
  })
})
