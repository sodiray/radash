import chai from 'chai'

import * as ary from '../array'

const { assert } = chai


test('sort uses getter', () => {

  const list = [{ index: 2 }, { index: 0 }, { index: 1 }]

  const result = ary.sort(list, i => i.index)

  assert.equal(result[0].index, 0)
  assert.equal(result[1].index, 1)
  assert.equal(result[2].index, 2)

})


test('sort descending order', () => {

  const list = [{ index: 2 }, { index: 0 }, { index: 1 }]

  const result = ary.sort(list, i => i.index, true)

  assert.equal(result[0].index, 2)
  assert.equal(result[1].index, 1)
  assert.equal(result[2].index, 0)

})
