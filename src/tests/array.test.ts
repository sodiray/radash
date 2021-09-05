import * as chai from 'chai'
import * as _ from '../array'

const { assert } = chai


test('sort uses getter', () => {

  const list = [{ index: 2 }, { index: 0 }, { index: 1 }]

  const result = _.sort(list, i => i.index)

  assert.equal(result[0].index, 0)
  assert.equal(result[1].index, 1)
  assert.equal(result[2].index, 2)

})


test('sort descending order', () => {

  const list = [{ index: 2 }, { index: 0 }, { index: 1 }]

  const result = _.sort(list, i => i.index, true)

  assert.equal(result[0].index, 2)
  assert.equal(result[1].index, 1)
  assert.equal(result[2].index, 0)

})

test('range creates correct list', () => {
  const r = _.range(0, 4)
  const total = [...r].reduce((a, b) => a + b)
  assert.equal(total, 10)
  assert.equal(r[0], 0)
  assert.equal(r[4], 4)
})

test('range creates correct list with step', () => {
  const r = _.range(0, 10, 2)
  const total = [...r].reduce((a, b) => a + b)
  assert.equal(total, 30)
  assert.equal(r[0], 0)
  assert.equal(r[4], 8)
  assert.equal(r[5], 10)
})