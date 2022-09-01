export const capitalize = (str: string): string => {
  if (!str || str.length === 0) return ''
  const lower = str.toLowerCase()
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length)
}

/**
 * Joins all string arguments in a camel case fashion
 *
 * camel('hello', 'world')   -> 'helloWorld'
 * camel('va', 'va', 'voom') -> 'vaVaVoom'
 */
export const camel = (str: string): string => {
  const parts = str?.split(/[\.\-\s_]/).map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return parts.reduce((acc, part) => {
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`
  })
}

/**
 * Joins all string arguments in a snake case fashion
 *
 * camel('hello', 'world')   -> 'hello_world'
 * camel('va', 'va', 'voom') -> 'va_va_voom'
 */
export const snake = (str: string): string => {
  const parts = str?.split(/[\.\-\s_]/).map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return parts.reduce((acc, part) => {
    return `${acc}_${part.toLowerCase()}`
  })
}

/**
 * Joins all string arguments in a dash case fashion
 *
 * camel('hello', 'world')   -> 'hello-world'
 * camel('va', 'va', 'voom') -> 'va-va-voom'
 */
export const dash = (str: string): string => {
  const parts = str?.split(/[\.\-\s_]/).map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return parts.reduce((acc, part) => {
    return `${acc}-${part.toLowerCase()}`
  })
}

/**
 * template is used to replace data by name in template strings.
 * The default expression looks for {{name}} to identify names.
 *
 * Ex. tempalte('Hello, {{name}}', { name: 'ray' })
 * Ex. template('Hello, <name>', { name: 'ray' }, /<(.+?)>/g)
 */
export const template = (
  str: string,
  data: Record<string, any>,
  regex = /\{\{(.+?)\}\}/g
) => {
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    return acc.replace(match[0], data[match[1]])
  }, str)
}
