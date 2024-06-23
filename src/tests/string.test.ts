import { expect } from 'vitest'
import * as _ from '..'

describe('string module', () => {
  describe('camel function', () => {
    test('returns correctly cased string', () => {
      const result = _.camel('hello world')
      expect(result).toBe('helloWorld')
    })
    test('returns single word', () => {
      const result = _.camel('hello')
      expect(result).toBe('hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.camel(null as any)
      expect(result).toBe('')
    })
    test('a word in camel case should remain in camel case', () => {
      const result = _.camel('helloWorld')
      expect(result).toBe('helloWorld')
    })
  })

  describe('camelCase function', () => {
    test('returns non alphanumerics with -space and capital', () => {
      const result = _.camel('Exobase Starter_flash AND-go')
      expect(result).toBe('exobaseStarterFlashAndGo')
    })
  })

  describe('snake function', () => {
    test('returns correctly cased string', () => {
      const result = _.snake('hello world')
      expect(result).toBe('hello_world')
    })
    test('must handle strings that are camelCase', () => {
      const result = _.snake('helloWorld')
      expect(result).toBe('hello_world')
    })
    test('must handle strings that are dash', () => {
      const result = _.snake('hello-world')
      expect(result).toBe('hello_world')
    })
    test('splits numbers that are next to letters', () => {
      const result = _.snake('hello-world12_19-bye')
      expect(result).toBe('hello_world_12_19_bye')
    })
    test('does not split numbers when flag is set to false', () => {
      const result = _.snake('hello-world12_19-bye', {
        splitOnNumber: false
      })
      expect(result).toBe('hello_world12_19_bye')
    })
    test('returns single word', () => {
      const result = _.snake('hello')
      expect(result).toBe('hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.snake(null as any)
      expect(result).toBe('')
    })
  })

  describe('snakeCase function', () => {
    test('returns non alphanumerics with _', () => {
      const result = _.snake('Exobase Starter_flash AND-go')
      expect(result).toBe('exobase_starter_flash_and_go')
    })
  })

  describe('dash function', () => {
    test('returns correctly cased string', () => {
      const result = _.dash('hello world')
      expect(result).toBe('hello-world')
    })
    test('returns single word', () => {
      const result = _.dash('hello')
      expect(result).toBe('hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.dash(null as any)
      expect(result).toBe('')
    })
    test('must handle strings that are camelCase', () => {
      const result = _.dash('helloWorld')
      expect(result).toBe('hello-world')
    })
    test('must handle strings that are dash', () => {
      const result = _.dash('hello-world')
      expect(result).toBe('hello-world')
    })
  })

  describe('dashCase function', () => {
    test('returns non alphanumerics with -', () => {
      const result = _.dash('Exobase Starter_flash AND-go')
      expect(result).toBe('exobase-starter-flash-and-go')
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

      expect(result).toBe(expected)
    })

    test('replaces all occurrences given template', () => {
      const tmp = `Hello <name>.`
      const data = {
        name: 'Ray'
      }

      const result = _.template(tmp, data, /<(.+?)>/g)
      expect(result).toBe(`Hello ${data.name}.`)
    })
  })

  describe('capitalize function', () => {
    test('handles null', () => {
      const result = _.capitalize(null as any)
      expect(result).toBe('')
    })
    test('converts hello as Hello', () => {
      const result = _.capitalize('hello')
      expect(result).toBe('Hello')
    })
    test('converts hello Bob as Hello bob', () => {
      const result = _.capitalize('hello Bob')
      expect(result).toBe('Hello bob')
    })
  })

  describe('pascal function', () => {
    test('returns non alphanumerics in pascal', () => {
      const result = _.pascal('Exobase Starter_flash AND-go')
      expect(result).toBe('ExobaseStarterFlashAndGo')
    })
    test('returns single word', () => {
      const result = _.pascal('hello')
      expect(result).toBe('Hello')
    })
    test('returns empty string for empty input', () => {
      const result = _.pascal(null as any)
      expect(result).toBe('')
    })
  })

  describe('title function', () => {
    test('returns input formatted in title case', () => {
      expect(_.title('hello world')).toBe('Hello World')
      expect(_.title('va_va_boom')).toBe('Va Va Boom')
      expect(_.title('root-hook   -  ok!')).toBe('Root Hook Ok!')
      expect(_.title('queryItems')).toBe('Query Items')
      expect(_.title('queryAllItems-in_Database')).toBe('Query All Items In Database')
    })
    test('returns empty string for bad input', () => {
      expect(_.title(null)).toBe('')
      expect(_.title(undefined)).toBe('')
    })
  })

  describe('trim function', () => {
    test('handles bad input', () => {
      expect(_.trim(null)).toBe('')
      expect(_.trim(undefined)).toBe('')
    })
    test('returns input string correctly trimmed', () => {
      expect(_.trim('\n\n\t\nhello\n\t  \n', '\n\t ')).toBe('hello')
      expect(_.trim('hello', 'x')).toBe('hello')
      expect(_.trim(' hello  ')).toBe('hello')
      expect(_.trim(' __hello__  ', '_')).toBe(' __hello__  ')
      expect(_.trim('__hello__', '_')).toBe('hello')
      expect(_.trim('//repos////', '/')).toBe('repos')
      expect(_.trim('/repos/:owner/:repo/', '/')).toBe('repos/:owner/:repo')
    })

    test('handles when char to trim is special case in regex', () => {
      expect(_.trim('_- hello_- ', '_- ')).toBe('hello')
    })
  })
})
