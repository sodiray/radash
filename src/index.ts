
export {
  group,
  boil,
  sum,
  sort,
  first,
  last,
  replace,
  select,
  min,
  max,
  cluster,
  unique,
  shuffle,
  objectify,
  draw,
  range,
  flat,
  intersects,
  fork,
  merge,
  replaceOrAppend,
  sift,
  iterate
} from './array'

export {
  series
} from './series'

export {
  map,
  reduce,
  defer,
  retry,
  tryit as try,
  sleep,
} from './async'

export {
  chain,
  compose,
  partial,
  proxied,
  partob,
  memo,
} from './curry'

export {
  shake,
  mapKeys,
  mapValues,
  lowerize,
  upperize,
  clone,
  listify,
  pick,
  omit,
  get
} from './object'

export {
  camal,
  snake,
  dash,
  template,
  uid
} from './string'

export {
  isArray,
  isObject,
  isFunction,
  isString,
  isEmpty,
  isNumber,
  isSymbol,
} from './typed'

export {
  random
} from './number'
