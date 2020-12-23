

export const chain = (...funcs) => (...args) => funcs.slice(1, funcs.length).reduce((acc, fn) => fn(acc), funcs[0](...args))
export const compose = (...funcs) => funcs.reverse().reduce((acc, fn) => fn(acc))
export const partial = (fn, ...args) => (...rest) => fn(...args, ...rest)
export const partob = (fn, argobj) => (restobj) => fn({ ...argobj, ...restobj })
export const tryit = (func) => async (...args) => { 
  try { 
    return [null, await func(...args)] 
  } catch (err) { 
    return [err, null] 
  } 
}


export const proxied = (cb) => {
  return new Proxy({}, {
    get: (target, arg) => cb(arg)
  })
}
