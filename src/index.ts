
import {
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
  dict,
  draw,
  range
} from './array'

import {
  asyncMap,
  asyncReduce
} from './async'

import {
  chain,
  compose,
  partial,
  proxied,
  partob,
  tryit,
  memo,
  iter
} from './curry'

import {
  shake,
  mapKeys,
  mapValues,
  lowerize,
  upperize,
  clone
} from './object'

import {
  camal,
  snake,
  template,
  uid
} from './string'

import {
  isArray,
  isObject,
  isFunction,
  isString
} from './typed'

import {
  random
} from './number'

export default {
  group,
  boil,
  sum,
  sort,
  first,
  last,
  replace,
  asyncMap,
  asyncReduce,
  chain,
  compose,
  partial,
  proxied,
  partob,
  tryit,
  try: tryit,
  shake,
  mapKeys,
  mapValues,
  lowerize,
  upperize,
  clone,
  camal,
  snake,
  template,
  isArray,
  isObject,
  isFunction,
  isString,
  select,
  min,
  max,
  cluster,
  unique,
  shuffle,
  dict,
  draw,
  random,
  memo,
  iter,
  range,
  uid
}