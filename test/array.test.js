import chai from 'chai'

import * as ary from '../array.js'

const { assert } = chai


export const test_sort_usesGetter = () => {

  const list = [{ index: 2 }, { index: 0 }, { index: 1 }]

  const result = ary.sort(list, i => i.index)

  assert.equal(result[0].index, 0)
  assert.equal(result[1].index, 1)
  assert.equal(result[2].index, 2)

}


export const test_sort_descendingOrder = () => {

  const list = [{ index: 2 }, { index: 0 }, { index: 1 }]

  const result = ary.sort(list, i => i.index, true)

  assert.equal(result[0].index, 2)
  assert.equal(result[1].index, 1)
  assert.equal(result[2].index, 0)

}
