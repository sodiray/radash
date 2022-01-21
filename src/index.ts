
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
  range,
  flat,
  intersects
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
  iter,
  defered
} from './curry'

import {
  shake,
  mapKeys,
  mapValues,
  lowerize,
  upperize,
  clone,
  listify
} from './object'

import {
  camal,
  camalCase,
  snake,
  snakeCase,
  dash,
  dashCase,
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

export type { Defer } from './curry'

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
  camalCase,
  snake,
  snakeCase,
  dash,
  dashCase,
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
  objectify: dict,
  listify,
  draw,
  random,
  intersects,
  memo,
  iter,
  range,
  uid,
  flat,
  defered
}