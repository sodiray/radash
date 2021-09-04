import chai from 'chai'

import * as _ from '../curry'

const { assert } = chai


test('compose', () => {

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

test('compose composes async', async () => {

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

test('partial passes single args', () => {

  const add = (a: number, b: number) => a + b

  const expected = 20
  const result = _.partial(add, 10)(10)

  assert.equal(result, expected)

})

test('partial_passesManyArgs', () => {

  const add = (...nums: number[]) => nums.reduce((a, b) => a + b, 0)

  const expected = 10
  const result = _.partial(add, 2, 2, 2)(2, 2)

  assert.equal(result, expected)

})

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

