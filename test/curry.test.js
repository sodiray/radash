import chai from 'chai'

import * as _ from '../curry.js'

const { assert } = chai

export const test_compose = () => {

  const useZero = (fn) => () => fn(0)
  const objectize = (fn) => (num) => fn({ num })
  const incrament = (fn) => ({ num }) => fn({ num: num + 1 })
  const returnArg = arg => (args) => args[arg]

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

}

export const test_compose_composesAsync = async () => {

  const useZero = (fn) => async () => await fn(0)
  const objectize = (fn) => async (num) => await fn({ num })
  const incrament = (fn) => async ({ num }) => await fn({ num: num + 1 })
  const returnArg = (arg) => async (args) => await args[arg]

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

}

export const test_partial_passesSingleArgs = () => {

  const add = (a, b) => a + b

  const expected = 20
  const result = _.partial(add, 10)(10)

  assert.equal(result, expected)

}

export const test_partial_passesManyArgs = () => {

  const add = (...nums) => nums.reduce((a, b) => a + b, 0)

  const expected = 10
  const result = _.partial(add, 2, 2, 2)(2, 2)

  assert.equal(result, expected)

}

export const test_partob_passesSingleArgs = () => {

  const add = ({ a, b }) => a + b

  const expected = 20
  const result = _.partob(add, { a: 10 })({ b: 10 })

  assert.equal(result, expected)

}

export const test_partob_overridesInitalWithLater = () => {

  const add = ({ a, b }) => a + b

  const expected = 15
  const result = _.partob(add, { a: 10 })({ a: 5, b: 10 })

  assert.equal(result, expected)

}

