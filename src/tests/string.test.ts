import { assert } from 'chai'
import _ from '..'

describe('string module', () => {

  describe('camal function', () => {
    test('returns correctly cased string', () => {
      const result = _.camal(
        'hello', 'world'
      )
      assert.equal(result, 'helloWorld')
    })
    test('returns single word', () => {
      const result = _.camal(
        'hello'
      )
      assert.equal(result, 'hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.camal()
      assert.equal(result, '')
    })
  })

  describe('camalCase function', () => {
    test('returns non alphanumerics with -space and capital', () => {
      const result = _.camalCase('Exobase Starter_flash AND-go')
      assert.equal(result, 'exobaseStarterFlashAndGo')
    })
  })

  describe('snake function', () => {
    test('returns correctly cased string', () => {
      const result = _.snake(
        'hello', 'world'
      )
      assert.equal(result, 'hello_world')
    })
    test('returns single word', () => {
      const result = _.snake(
        'hello'
      )
      assert.equal(result, 'hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.snake()
      assert.equal(result, '')
    })
  })

  describe('snakeCase function', () => {
    test('returns non alphanumerics with _', () => {
      const result = _.snakeCase('Exobase Starter_flash AND-go')
      assert.equal(result, 'exobase_starter_flash_and_go')
    })
  })

  describe('dash function', () => {
    test('returns correctly cased string', () => {
      const result = _.dash(
        'hello', 'world'
      )
      assert.equal(result, 'hello-world')
    })
    test('returns single word', () => {
      const result = _.dash(
        'hello'
      )
      assert.equal(result, 'hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.dash()
      assert.equal(result, '')
    })
  })

  describe('dashCase function', () => {
    test('returns non alphanumerics with -', () => {
      const result = _.dashCase('Exobase Starter_flash AND-go')
      assert.equal(result, 'exobase-starter-flash-and-go')
    })
  })

  describe('template function', () => {
    test('replaces all occurrences', () => {

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
  })

  describe('uid function', () => {
    test('generates the correct length string', () => {
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
  })

})