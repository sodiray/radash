import { assert } from 'chai'
import * as _ from '..'

describe('string module', () => {
  describe('camel function', () => {
    test('returns correctly cased string', () => {
      const result = _.camel('hello world')
      assert.equal(result, 'helloWorld')
    })
    test('returns single word', () => {
      const result = _.camel('hello')
      assert.equal(result, 'hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.camel(null as any)
      assert.equal(result, '')
    })
    test('a word in camel case should remain in camel case', () => {
      const result = _.camel('helloWorld')
      assert.equal(result, 'helloWorld')
    })
  })

  describe('camelCase function', () => {
    test('returns non alphanumerics with -space and capital', () => {
      const result = _.camel('Exobase Starter_flash AND-go')
      assert.equal(result, 'exobaseStarterFlashAndGo')
    })
  })

  describe('snake function', () => {
    test('returns correctly cased string', () => {
      const result = _.snake('hello world')
      assert.equal(result, 'hello_world')
    })
    test('must handle strings that are camelCase', () => {
      const result = _.snake('helloWorld')
      assert.equal(result, 'hello_world')
    })
    test('must handle strings that are dash', () => {
      const result = _.snake('hello-world')
      assert.equal(result, 'hello_world')
    })
    test('splits numbers that are next to letters', () => {
      const result = _.snake('hello-world12_19-bye')
      assert.equal(result, 'hello_world_12_19_bye')
    })
    test('does not split numbers when flag is set to false', () => {
      const result = _.snake('hello-world12_19-bye', {
        splitOnNumber: false
      })
      assert.equal(result, 'hello_world12_19_bye')
    })
    test('returns single word', () => {
      const result = _.snake('hello')
      assert.equal(result, 'hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.snake(null as any)
      assert.equal(result, '')
    })
  })

  describe('snakeCase function', () => {
    test('returns non alphanumerics with _', () => {
      const result = _.snake('Exobase Starter_flash AND-go')
      assert.equal(result, 'exobase_starter_flash_and_go')
    })
  })

  describe('dash function', () => {
    test('returns correctly cased string', () => {
      const result = _.dash('hello world')
      assert.equal(result, 'hello-world')
    })
    test('returns single word', () => {
      const result = _.dash('hello')
      assert.equal(result, 'hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.dash(null as any)
      assert.equal(result, '')
    })
    test('must handle strings that are camelCase', () => {
      const result = _.dash('helloWorld')
      assert.equal(result, 'hello-world')
    })
    test('must handle strings that are dash', () => {
      const result = _.dash('hello-world')
      assert.equal(result, 'hello-world')
    })
  })

  describe('dashCase function', () => {
    test('returns non alphanumerics with -', () => {
      const result = _.dash('Exobase Starter_flash AND-go')
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

    test('replaces all occurrences given template', () => {
      const tmp = `Hello <name>.`
      const data = {
        name: 'Ray'
      }

      const result = _.template(tmp, data, /<(.+?)>/g)
      assert.equal(result, `Hello ${data.name}.`)
    })
  })

  describe('capitalize function', () => {
    test('handles null', () => {
      const result = _.capitalize(null as any)
      assert.equal(result, '')
    })
    test('converts hello as Hello', () => {
      const result = _.capitalize('hello')
      assert.equal(result, 'Hello')
    })
    test('converts hello Bob as Hello bob', () => {
      const result = _.capitalize('hello Bob')
      assert.equal(result, 'Hello bob')
    })
  })

  describe('pascal function', () => {
    test('returns non alphanumerics in pascal', () => {
      const result = _.pascal('Exobase Starter_flash AND-go')
      assert.equal(result, 'ExobaseStarterFlashAndGo')
    })
    test('returns single word', () => {
      const result = _.pascal('hello')
      assert.equal(result, 'Hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.pascal(null as any)
      assert.equal(result, '')
    })
  })

  describe('repeat function', () => { 
    test('return empty string in repeat', () => { 
      assert.equal(_.repeat('a', 0), '')
      assert.equal(_.repeat('a', -1), '')
    })
    
    test('return a string specifying the number of repetitions', () => {
      assert.equal(_.repeat('a', 3), 'aaa')
      assert.equal(_.repeat('a', 1), 'a')
    })
   })

  describe('title function', () => {
    test('returns input formatted in title case', () => {
      assert.equal(_.title('hello world'), 'Hello World')
      assert.equal(_.title('va_va_boom'), 'Va Va Boom')
      assert.equal(_.title('root-hook   -  ok!'), 'Root Hook Ok!')
      assert.equal(_.title('queryItems'), 'Query Items')
      assert.equal(
        _.title('queryAllItems-in_Database'),
        'Query All Items In Database'
      )
    })
    test('returns empty string for bad input', () => {
      assert.equal(_.title(null), '')
      assert.equal(_.title(undefined), '')
    })
  })

  describe('trim function', () => {
    test('handles bad input', () => {
      assert.equal(_.trim(null), '')
      assert.equal(_.trim(undefined), '')
    })
    test('returns input string correctly trimmed', () => {
      assert.equal(_.trim('\n\n\t\nhello\n\t  \n', '\n\t '), 'hello')
      assert.equal(_.trim('hello', 'x'), 'hello')
      assert.equal(_.trim(' hello  '), 'hello')
      assert.equal(_.trim(' __hello__  ', '_'), ' __hello__  ')
      assert.equal(_.trim('__hello__', '_'), 'hello')
      assert.equal(_.trim('//repos////', '/'), 'repos')
      assert.equal(_.trim('/repos/:owner/:repo/', '/'), 'repos/:owner/:repo')
    })

    test('handles when char to trim is special case in regex', () => {
      assert.equal(_.trim('_- hello_- ', '_- '), 'hello')
    })
  })
})
