import { random } from './number'
import { iterate } from './array'

/**
 * Joins all string arguments in a camal case fashion
 * 
 * camal('hello', 'world')   -> 'helloWorld'
 * camal('va', 'va', 'voom') -> 'vaVaVoom'
 */
export const _camal = (...parts: string[]) => {
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return parts.reduce((acc, part) => {
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`
  })
}

export const camal = (str: string): string => {
  return _camal(...str.split(/[\.\-\s_]/).map(x => x.toLowerCase()))
}

/**
 * Joins all string arguments in a snake case fashion
 * 
 * camal('hello', 'world')   -> 'hello_world'
 * camal('va', 'va', 'voom') -> 'va_va_voom'
 */
export const _snake = (...parts: string[]) => {
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return parts.reduce((acc, part) => {
    return `${acc}_${part.toLowerCase()}`
  })
}

export const snake = (str: string): string => {
  return _snake(...str.split(/[\.\-\s_]/).map(x => x.toLowerCase()))
}

/**
 * Joins all string arguments in a dash case fashion
 * 
 * camal('hello', 'world')   -> 'hello-world'
 * camal('va', 'va', 'voom') -> 'va-va-voom'
 */
 export const _dash = (...parts: string[]) => {
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return parts.reduce((acc, part) => {
    return `${acc}-${part.toLowerCase()}`
  })
}

export const dash = (str: string): string => {
  return _dash(...str.split(/[\.\-\s_]/).map(x => x.toLowerCase()))
}

/**
 * template is used to replace data by name in template strings.
 * The default expression looks for {{name}} to identify names.
 * 
 * Ex. tempalte('Hello, {{name}}', { name: 'ray' })
 * Ex. template('Hello, <name>', { name: 'ray' }, /<(.+?)>/g)
 */
export const template = (str: string, data: Record<string, any>, regex = /\{\{(.+?)\}\}/g) => {
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    return acc.replace(match[0], data[match[1]])
  }, str)
}

export const uid = (length: number, specials: string = '') => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + specials
  return iterate(length, (acc) => {
    return acc + characters.charAt(random(0, characters.length - 1))
  }, '')
}