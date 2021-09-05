import * as chai from 'chai'
import * as _ from '../string'

const { assert } = chai


test('template replaces all occurrences', () => {

  const tmp = `
    Hello my name is {{name}}. I am a {{type}}.
    Not sure why I am {{reason}}.

    Thank You - {{name}}
  `

  const data = {
    name: 'Ray',
    type: 'template',
    reason: 'so beautiful'
  }

  const result = _.template(tmp, data)
  const expected = `
    Hello my name is ${data.name}. I am a ${data.type}.
    Not sure why I am ${data.reason}.

    Thank You - ${data.name}
  `

  assert.equal(result, expected)

})

test('uid generates the correct length string', () => {
  const result = _.uid(10)
  assert.equal(result.length, 10)
})

/**
 * @warning This is potentially a flaky test.
 * We're trying to assert that given additional
 * special chars our function will include them
 * in the random selection process to generate the
 * uid. However, there is always a small chance that
 * one is never selected. If the test is flaky, increase
 * the size of the uid and/or the number of underscores
 * in the special char addition.
 */
test('uid generates string including special', () => {
  const result = _.uid(300, '________________________________________________________________')
  assert.include(result, '_')
})