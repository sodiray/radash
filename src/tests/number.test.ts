import { assert } from 'chai'
import _ from '..'


describe('number module', () => {

  describe('random function', () => {
    test('returns a number', () => {
      const result = _.random(0, 100)
      assert.isAtLeast(result, 0)
      assert.isAtMost(result, 100)
    })
  })

})
