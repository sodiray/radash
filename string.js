
/**
 * Joins all string arguments in a camal case fashion
 * 
 * camal('hello', 'world')   -> 'helloWorld'
 * camal('va', 'va', 'voom') -> 'vaVaVoom'
 * 
 * @param  {...string} parts Any number of strings
 * @returns string
 */
export const camal = (...parts) => {
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[1]
  return parts.slice(1).reduce((acc, part) => {
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`
  })
}

export const snake = (...parts) => {
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[1]
  return parts.slice(1).reduce((acc, part) => {
    return `${acc}_${part.toLowerCase()}`
  })
}

const defaultRegex = /\{\{(.+?)\}\}/g

export const template = (str, data, regex = defaultRegex) => {
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    return acc.replace(match[0], data[match[1]])
  }, str)
}