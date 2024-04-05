const isSymbol = (value) => {
  return !!value && value.constructor === Symbol;
};
const isArray = Array.isArray;
const isObject = (value) => {
  return !!value && value.constructor === Object;
};
const isPrimitive = (value) => {
  return value === void 0 || value === null || typeof value !== "object" && typeof value !== "function";
};
const isFunction = (value) => {
  return !!(value && value.constructor && value.call && value.apply);
};
const isString = (value) => {
  return typeof value === "string" || value instanceof String;
};
const isInt = (value) => {
  return isNumber(value) && value % 1 === 0;
};
const isFloat = (value) => {
  return isNumber(value) && value % 1 !== 0;
};
const isNumber = (value) => {
  try {
    return Number(value) === value;
  } catch {
    return false;
  }
};
const isDate = (value) => {
  return Object.prototype.toString.call(value) === "[object Date]";
};
const isPromise = (value) => {
  if (!value)
    return false;
  if (!value.then)
    return false;
  if (!isFunction(value.then))
    return false;
  return true;
};
const isEmpty = (value) => {
  if (value === true || value === false)
    return true;
  if (value === null || value === void 0)
    return true;
  if (isNumber(value))
    return value === 0;
  if (isDate(value))
    return isNaN(value.getTime());
  if (isFunction(value))
    return false;
  if (isSymbol(value))
    return false;
  const length = value.length;
  if (isNumber(length))
    return length === 0;
  const size = value.size;
  if (isNumber(size))
    return size === 0;
  const keys = Object.keys(value).length;
  return keys === 0;
};
const isEqual = (x, y) => {
  if (Object.is(x, y))
    return true;
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime();
  }
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString();
  }
  if (typeof x !== "object" || x === null || typeof y !== "object" || y === null) {
    return false;
  }
  const keysX = Reflect.ownKeys(x);
  const keysY = Reflect.ownKeys(y);
  if (keysX.length !== keysY.length)
    return false;
  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y, keysX[i]))
      return false;
    if (!isEqual(x[keysX[i]], y[keysX[i]]))
      return false;
  }
  return true;
};

const group = (array, getGroupId) => {
  return array.reduce((acc, item) => {
    const groupId = getGroupId(item);
    if (!acc[groupId])
      acc[groupId] = [];
    acc[groupId].push(item);
    return acc;
  }, {});
};
function zip(...arrays) {
  if (!arrays || !arrays.length)
    return [];
  return new Array(Math.max(...arrays.map(({ length }) => length))).fill([]).map((_, idx) => arrays.map((array) => array[idx]));
}
function zipToObject(keys, values) {
  if (!keys || !keys.length) {
    return {};
  }
  const getValue = isFunction(values) ? values : isArray(values) ? (_k, i) => values[i] : (_k, _i) => values;
  return keys.reduce((acc, key, idx) => {
    acc[key] = getValue(key, idx);
    return acc;
  }, {});
}
const boil = (array, compareFunc) => {
  if (!array || (array.length ?? 0) === 0)
    return null;
  return array.reduce(compareFunc);
};
function sum(array, fn) {
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item), 0);
}
const first = (array, defaultValue = void 0) => {
  return array?.length > 0 ? array[0] : defaultValue;
};
const last = (array, defaultValue = void 0) => {
  return array?.length > 0 ? array[array.length - 1] : defaultValue;
};
const sort = (array, getter, desc = false) => {
  if (!array)
    return [];
  const asc = (a, b) => getter(a) - getter(b);
  const dsc = (a, b) => getter(b) - getter(a);
  return array.slice().sort(desc === true ? dsc : asc);
};
const alphabetical = (array, getter, dir = "asc") => {
  if (!array)
    return [];
  const asc = (a, b) => `${getter(a)}`.localeCompare(getter(b));
  const dsc = (a, b) => `${getter(b)}`.localeCompare(getter(a));
  return array.slice().sort(dir === "desc" ? dsc : asc);
};
const counting = (list2, identity) => {
  if (!list2)
    return {};
  return list2.reduce((acc, item) => {
    const id = identity(item);
    acc[id] = (acc[id] ?? 0) + 1;
    return acc;
  }, {});
};
const replace = (list2, newItem, match) => {
  if (!list2)
    return [];
  if (newItem === void 0)
    return [...list2];
  for (let idx = 0; idx < list2.length; idx++) {
    const item = list2[idx];
    if (match(item, idx)) {
      return [
        ...list2.slice(0, idx),
        newItem,
        ...list2.slice(idx + 1, list2.length)
      ];
    }
  }
  return [...list2];
};
const objectify = (array, getKey, getValue = (item) => item) => {
  return array.reduce((acc, item) => {
    acc[getKey(item)] = getValue(item);
    return acc;
  }, {});
};
const select = (array, mapper, condition) => {
  if (!array)
    return [];
  return array.reduce((acc, item, index) => {
    if (!condition(item, index))
      return acc;
    acc.push(mapper(item, index));
    return acc;
  }, []);
};
function max(array, getter) {
  const get = getter ?? ((v) => v);
  return boil(array, (a, b) => get(a) > get(b) ? a : b);
}
function min(array, getter) {
  const get = getter ?? ((v) => v);
  return boil(array, (a, b) => get(a) < get(b) ? a : b);
}
const cluster = (list2, size = 2) => {
  const clusterCount = Math.ceil(list2.length / size);
  return new Array(clusterCount).fill(null).map((_c, i) => {
    return list2.slice(i * size, i * size + size);
  });
};
const unique = (array, toKey) => {
  const valueMap = array.reduce((acc, item) => {
    const key = toKey ? toKey(item) : item;
    if (acc[key])
      return acc;
    acc[key] = item;
    return acc;
  }, {});
  return Object.values(valueMap);
};
function* range(startOrLength, end, valueOrMapper = (i) => i, step = 1) {
  const mapper = isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper;
  const start = end ? startOrLength : 0;
  const final = end ?? startOrLength;
  for (let i = start; i <= final; i += step) {
    yield mapper(i);
    if (i + step > final)
      break;
  }
}
const list = (startOrLength, end, valueOrMapper, step) => {
  return Array.from(range(startOrLength, end, valueOrMapper, step));
};
const flat = (lists) => {
  return lists.reduce((acc, list2) => {
    acc.push(...list2);
    return acc;
  }, []);
};
const intersects = (listA, listB, identity) => {
  if (!listA || !listB)
    return false;
  const ident = identity ?? ((x) => x);
  const dictB = listB.reduce((acc, item) => {
    acc[ident(item)] = true;
    return acc;
  }, {});
  return listA.some((value) => dictB[ident(value)]);
};
const fork = (list2, condition) => {
  if (!list2)
    return [[], []];
  return list2.reduce(
    (acc, item) => {
      const [a, b] = acc;
      if (condition(item)) {
        return [[...a, item], b];
      } else {
        return [a, [...b, item]];
      }
    },
    [[], []]
  );
};
const merge = (root, others, matcher) => {
  if (!others && !root)
    return [];
  if (!others)
    return root;
  if (!root)
    return [];
  if (!matcher)
    return root;
  return root.reduce((acc, r) => {
    const matched = others.find((o) => matcher(r) === matcher(o));
    if (matched)
      acc.push(matched);
    else
      acc.push(r);
    return acc;
  }, []);
};
const replaceOrAppend = (list2, newItem, match) => {
  if (!list2 && !newItem)
    return [];
  if (!newItem)
    return [...list2];
  if (!list2)
    return [newItem];
  for (let idx = 0; idx < list2.length; idx++) {
    const item = list2[idx];
    if (match(item, idx)) {
      return [
        ...list2.slice(0, idx),
        newItem,
        ...list2.slice(idx + 1, list2.length)
      ];
    }
  }
  return [...list2, newItem];
};
const toggle = (list2, item, toKey, options) => {
  if (!list2 && !item)
    return [];
  if (!list2)
    return [item];
  if (!item)
    return [...list2];
  const matcher = toKey ? (x, idx) => toKey(x, idx) === toKey(item, idx) : (x) => x === item;
  const existing = list2.find(matcher);
  if (existing)
    return list2.filter((x, idx) => !matcher(x, idx));
  const strategy = options?.strategy ?? "append";
  if (strategy === "append")
    return [...list2, item];
  return [item, ...list2];
};
const sift = (list2) => {
  return list2?.filter((x) => !!x) ?? [];
};
const iterate = (count, func, initValue) => {
  let value = initValue;
  for (let i = 1; i <= count; i++) {
    value = func(value, i);
  }
  return value;
};
const diff = (root, other, identity = (t) => t) => {
  if (!root?.length && !other?.length)
    return [];
  if (root?.length === void 0)
    return [...other];
  if (!other?.length)
    return [...root];
  const bKeys = other.reduce((acc, item) => {
    acc[identity(item)] = true;
    return acc;
  }, {});
  return root.filter((a) => !bKeys[identity(a)]);
};
function shift(arr, n) {
  if (arr.length === 0)
    return arr;
  const shiftNumber = n % arr.length;
  if (shiftNumber === 0)
    return arr;
  return [...arr.slice(-shiftNumber, arr.length), ...arr.slice(0, -shiftNumber)];
}

const reduce = async (array, asyncReducer, initValue) => {
  const initProvided = initValue !== void 0;
  if (!initProvided && array?.length < 1) {
    throw new Error("Cannot reduce empty array with no init value");
  }
  const iter = initProvided ? array : array.slice(1);
  let value = initProvided ? initValue : array[0];
  for (const [i, item] of iter.entries()) {
    value = await asyncReducer(value, item, i);
  }
  return value;
};
const map = async (array, asyncMapFunc) => {
  if (!array)
    return [];
  let result = [];
  let index = 0;
  for (const value of array) {
    const newValue = await asyncMapFunc(value, index++);
    result.push(newValue);
  }
  return result;
};
const defer = async (func) => {
  const callbacks = [];
  const register = (fn, options) => callbacks.push({
    fn,
    rethrow: options?.rethrow ?? false
  });
  const [err, response] = await tryit(func)(register);
  for (const { fn, rethrow } of callbacks) {
    const [rethrown] = await tryit(fn)(err);
    if (rethrown && rethrow)
      throw rethrown;
  }
  if (err)
    throw err;
  return response;
};
class AggregateError extends Error {
  constructor(errors = []) {
    super();
    const name = errors.find((e) => e.name)?.name ?? "";
    this.name = `AggregateError(${name}...)`;
    this.message = `AggregateError with ${errors.length} errors`;
    this.stack = errors.find((e) => e.stack)?.stack ?? this.stack;
    this.errors = errors;
  }
}
const parallel = async (limit, array, func) => {
  const work = array.map((item, index) => ({
    index,
    item
  }));
  const processor = async (res) => {
    const results2 = [];
    while (true) {
      const next = work.pop();
      if (!next)
        return res(results2);
      const [error, result] = await tryit(func)(next.item);
      results2.push({
        error,
        result,
        index: next.index
      });
    }
  };
  const queues = list(1, limit).map(() => new Promise(processor));
  const itemResults = await Promise.all(queues);
  const [errors, results] = fork(
    sort(itemResults.flat(), (r) => r.index),
    (x) => !!x.error
  );
  if (errors.length > 0) {
    throw new AggregateError(errors.map((error) => error.error));
  }
  return results.map((r) => r.result);
};
async function all(promises) {
  const entries = isArray(promises) ? promises.map((p) => [null, p]) : Object.entries(promises);
  const results = await Promise.all(
    entries.map(
      ([key, value]) => value.then((result) => ({ result, exc: null, key })).catch((exc) => ({ result: null, exc, key }))
    )
  );
  const exceptions = results.filter((r) => r.exc);
  if (exceptions.length > 0) {
    throw new AggregateError(exceptions.map((e) => e.exc));
  }
  if (isArray(promises)) {
    return results.map((r) => r.result);
  }
  return results.reduce(
    (acc, item) => ({
      ...acc,
      [item.key]: item.result
    }),
    {}
  );
}
const retry = async (options, func) => {
  const times = options?.times ?? 3;
  const delay = options?.delay;
  const backoff = options?.backoff ?? null;
  for (const i of range(1, times)) {
    const [err, result] = await tryit(func)((err2) => {
      throw { _exited: err2 };
    });
    if (!err)
      return result;
    if (err._exited)
      throw err._exited;
    if (i === times)
      throw err;
    if (delay)
      await sleep(delay);
    if (backoff)
      await sleep(backoff(i));
  }
  return void 0;
};
const sleep = (milliseconds) => {
  return new Promise((res) => setTimeout(res, milliseconds));
};
const tryit = (func) => {
  return (...args) => {
    try {
      const result = func(...args);
      if (isPromise(result)) {
        return result.then((value) => [void 0, value]).catch((err) => [err, void 0]);
      }
      return [void 0, result];
    } catch (err) {
      return [err, void 0];
    }
  };
};
const guard = (func, shouldGuard) => {
  const _guard = (err) => {
    if (shouldGuard && !shouldGuard(err))
      throw err;
    return void 0;
  };
  const isPromise2 = (result) => result instanceof Promise;
  try {
    const result = func();
    return isPromise2(result) ? result.catch(_guard) : result;
  } catch (err) {
    return _guard(err);
  }
};

function chain(...funcs) {
  return (...args) => {
    return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args));
  };
}
function compose(...funcs) {
  return funcs.reverse().reduce((acc, fn) => fn(acc));
}
const partial = (fn, ...args) => {
  return (...rest) => fn(...[...args, ...rest]);
};
const partob = (fn, argobj) => {
  return (restobj) => fn({
    ...argobj,
    ...restobj
  });
};
const proxied = (handler) => {
  return new Proxy(
    {},
    {
      get: (target, propertyName) => handler(propertyName)
    }
  );
};
const memoize = (cache, func, keyFunc, ttl) => {
  return function callWithMemo(...args) {
    const key = keyFunc ? keyFunc(...args) : JSON.stringify({ args });
    const existing = cache[key];
    if (existing !== void 0) {
      if (!existing.exp)
        return existing.value;
      if (existing.exp > new Date().getTime()) {
        return existing.value;
      }
    }
    const result = func(...args);
    cache[key] = {
      exp: ttl ? new Date().getTime() + ttl : null,
      value: result
    };
    return result;
  };
};
const memo = (func, options = {}) => {
  return memoize({}, func, options.key ?? null, options.ttl ?? null);
};
const debounce = ({ delay }, func) => {
  let timer = void 0;
  let active = true;
  const debounced = (...args) => {
    if (active) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        active && func(...args);
        timer = void 0;
      }, delay);
    } else {
      func(...args);
    }
  };
  debounced.isPending = () => {
    return timer !== void 0;
  };
  debounced.cancel = () => {
    active = false;
  };
  debounced.flush = (...args) => func(...args);
  return debounced;
};
const throttle = ({ interval }, func) => {
  let ready = true;
  let timer = void 0;
  const throttled = (...args) => {
    if (!ready)
      return;
    func(...args);
    ready = false;
    timer = setTimeout(() => {
      ready = true;
      timer = void 0;
    }, interval);
  };
  throttled.isThrottled = () => {
    return timer !== void 0;
  };
  return throttled;
};
const callable = (obj, fn) => {
  const FUNC = () => {
  };
  return new Proxy(Object.assign(FUNC, obj), {
    get: (target, key) => target[key],
    set: (target, key, value) => {
      target[key] = value;
      return true;
    },
    apply: (target, self, args) => fn(Object.assign({}, target))(...args)
  });
};

function inRange(number, start, end) {
  const isTypeSafe = typeof number === "number" && typeof start === "number" && (typeof end === "undefined" || typeof end === "number");
  if (!isTypeSafe) {
    return false;
  }
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  return number >= Math.min(start, end) && number < Math.max(start, end);
}
const toFloat = (value, defaultValue) => {
  const def = defaultValue === void 0 ? 0 : defaultValue;
  if (value === null || value === void 0) {
    return def;
  }
  const result = parseFloat(value);
  return isNaN(result) ? def : result;
};
const toInt = (value, defaultValue) => {
  const def = defaultValue === void 0 ? 0 : defaultValue;
  if (value === null || value === void 0) {
    return def;
  }
  const result = parseInt(value);
  return isNaN(result) ? def : result;
};

const shake = (obj, filter = (x) => x === void 0) => {
  if (!obj)
    return {};
  const keys2 = Object.keys(obj);
  return keys2.reduce((acc, key) => {
    if (filter(obj[key])) {
      return acc;
    } else {
      acc[key] = obj[key];
      return acc;
    }
  }, {});
};
const mapKeys = (obj, mapFunc) => {
  const keys2 = Object.keys(obj);
  return keys2.reduce((acc, key) => {
    acc[mapFunc(key, obj[key])] = obj[key];
    return acc;
  }, {});
};
const mapValues = (obj, mapFunc) => {
  const keys2 = Object.keys(obj);
  return keys2.reduce((acc, key) => {
    acc[key] = mapFunc(obj[key], key);
    return acc;
  }, {});
};
const mapEntries = (obj, toEntry) => {
  if (!obj)
    return {};
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const [newKey, newValue] = toEntry(key, value);
    acc[newKey] = newValue;
    return acc;
  }, {});
};
const invert = (obj) => {
  if (!obj)
    return {};
  const keys2 = Object.keys(obj);
  return keys2.reduce((acc, key) => {
    acc[obj[key]] = key;
    return acc;
  }, {});
};
const lowerize = (obj) => mapKeys(obj, (k) => k.toLowerCase());
const upperize = (obj) => mapKeys(obj, (k) => k.toUpperCase());
const clone = (obj) => {
  if (isPrimitive(obj)) {
    return obj;
  }
  if (typeof obj === "function") {
    return obj.bind({});
  }
  const newObj = new obj.constructor();
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    newObj[prop] = obj[prop];
  });
  return newObj;
};
const listify = (obj, toItem) => {
  if (!obj)
    return [];
  const entries = Object.entries(obj);
  if (entries.length === 0)
    return [];
  return entries.reduce((acc, entry) => {
    acc.push(toItem(entry[0], entry[1]));
    return acc;
  }, []);
};
const pick = (obj, keys2) => {
  if (!obj)
    return {};
  return keys2.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      acc[key] = obj[key];
    return acc;
  }, {});
};
const omit = (obj, keys2) => {
  if (!obj)
    return {};
  if (!keys2 || keys2.length === 0)
    return obj;
  return keys2.reduce(
    (acc, key) => {
      delete acc[key];
      return acc;
    },
    { ...obj }
  );
};
const get = (value, path, defaultValue) => {
  const segments = path.split(/[\.\[\]]/g);
  let current = value;
  for (const key of segments) {
    if (current === null)
      return defaultValue;
    if (current === void 0)
      return defaultValue;
    const dequoted = key.replace(/['"]/g, "");
    if (dequoted.trim() === "")
      continue;
    current = current[dequoted];
  }
  if (current === void 0)
    return defaultValue;
  return current;
};
const set = (initial, path, value) => {
  if (!initial)
    return {};
  if (!path || value === void 0)
    return initial;
  const segments = path.split(/[\.\[\]]/g).filter((x) => !!x.trim());
  const _set = (node) => {
    if (segments.length > 1) {
      const key = segments.shift();
      const nextIsNum = toInt(segments[0], null) === null ? false : true;
      node[key] = node[key] === void 0 ? nextIsNum ? [] : {} : node[key];
      _set(node[key]);
    } else {
      node[segments[0]] = value;
    }
  };
  const cloned = clone(initial);
  _set(cloned);
  return cloned;
};
const assign = (initial, override) => {
  if (!initial || !override)
    return initial ?? override ?? {};
  const merged = { ...initial };
  for (const key in override) {
    if (override.hasOwnProperty(key)) {
      if (isObject(initial[key])) {
        merged[key] = assign(initial[key], override[key]);
      } else {
        merged[key] = override[key];
      }
    }
  }
  return merged;
};
const keys = (value) => {
  if (!value)
    return [];
  const getKeys = (nested, paths) => {
    if (isObject(nested)) {
      return Object.entries(nested).flatMap(
        ([k, v]) => getKeys(v, [...paths, k])
      );
    }
    if (isArray(nested)) {
      return nested.flatMap((item, i) => getKeys(item, [...paths, `${i}`]));
    }
    return [paths.join(".")];
  };
  return getKeys(value, []);
};
const crush = (value) => {
  if (!value)
    return {};
  return objectify(
    keys(value),
    (k) => k,
    (k) => get(value, k)
  );
};
const construct = (obj) => {
  if (!obj)
    return {};
  return Object.keys(obj).reduce((acc, path) => {
    return set(acc, path, obj[path]);
  }, {});
};

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const draw = (array) => {
  const max = array.length;
  if (max === 0) {
    return null;
  }
  const index = random(0, max - 1);
  return array[index];
};
const shuffle = (array) => {
  return array.map((a) => ({ rand: Math.random(), value: a })).sort((a, b) => a.rand - b.rand).map((a) => a.value);
};
const uid = (length, specials = "") => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + specials;
  return iterate(
    length,
    (acc) => {
      return acc + characters.charAt(random(0, characters.length - 1));
    },
    ""
  );
};

const series = (items, toKey = (item) => `${item}`) => {
  const { indexesByKey, itemsByIndex } = items.reduce(
    (acc, item, idx) => ({
      indexesByKey: {
        ...acc.indexesByKey,
        [toKey(item)]: idx
      },
      itemsByIndex: {
        ...acc.itemsByIndex,
        [idx]: item
      }
    }),
    {
      indexesByKey: {},
      itemsByIndex: {}
    }
  );
  const min = (a, b) => {
    return indexesByKey[toKey(a)] < indexesByKey[toKey(b)] ? a : b;
  };
  const max = (a, b) => {
    return indexesByKey[toKey(a)] > indexesByKey[toKey(b)] ? a : b;
  };
  const first = () => {
    return itemsByIndex[0];
  };
  const last = () => {
    return itemsByIndex[items.length - 1];
  };
  const next = (current, defaultValue) => {
    return itemsByIndex[indexesByKey[toKey(current)] + 1] ?? defaultValue ?? first();
  };
  const previous = (current, defaultValue) => {
    return itemsByIndex[indexesByKey[toKey(current)] - 1] ?? defaultValue ?? last();
  };
  const spin = (current, num) => {
    if (num === 0)
      return current;
    const abs = Math.abs(num);
    const rel = abs > items.length ? abs % items.length : abs;
    return list(0, rel - 1).reduce(
      (acc) => num > 0 ? next(acc) : previous(acc),
      current
    );
  };
  return {
    min,
    max,
    first,
    last,
    next,
    previous,
    spin
  };
};

const capitalize = (str) => {
  if (!str || str.length === 0)
    return "";
  const lower = str.toLowerCase();
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length);
};
const camel = (str) => {
  const parts = str?.replace(/([A-Z])+/g, capitalize)?.split(/(?=[A-Z])|[\.\-\s_]/).map((x) => x.toLowerCase()) ?? [];
  if (parts.length === 0)
    return "";
  if (parts.length === 1)
    return parts[0];
  return parts.reduce((acc, part) => {
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`;
  });
};
const snake = (str, options) => {
  const parts = str?.replace(/([A-Z])+/g, capitalize).split(/(?=[A-Z])|[\.\-\s_]/).map((x) => x.toLowerCase()) ?? [];
  if (parts.length === 0)
    return "";
  if (parts.length === 1)
    return parts[0];
  const result = parts.reduce((acc, part) => {
    return `${acc}_${part.toLowerCase()}`;
  });
  return options?.splitOnNumber === false ? result : result.replace(/([A-Za-z]{1}[0-9]{1})/, (val) => `${val[0]}_${val[1]}`);
};
const dash = (str) => {
  const parts = str?.replace(/([A-Z])+/g, capitalize)?.split(/(?=[A-Z])|[\.\-\s_]/).map((x) => x.toLowerCase()) ?? [];
  if (parts.length === 0)
    return "";
  if (parts.length === 1)
    return parts[0];
  return parts.reduce((acc, part) => {
    return `${acc}-${part.toLowerCase()}`;
  });
};
const pascal = (str) => {
  const parts = str?.split(/[\.\-\s_]/).map((x) => x.toLowerCase()) ?? [];
  if (parts.length === 0)
    return "";
  return parts.map((str2) => str2.charAt(0).toUpperCase() + str2.slice(1)).join("");
};
const title = (str) => {
  if (!str)
    return "";
  return str.split(/(?=[A-Z])|[\.\-\s_]/).map((s) => s.trim()).filter((s) => !!s).map((s) => capitalize(s.toLowerCase())).join(" ");
};
const template = (str, data, regex = /\{\{(.+?)\}\}/g) => {
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    return acc.replace(match[0], data[match[1]]);
  }, str);
};
const trim = (str, charsToTrim = " ") => {
  if (!str)
    return "";
  const toTrim = charsToTrim.replace(/[\W]{1}/g, "\\$&");
  const regex = new RegExp(`^[${toTrim}]+|[${toTrim}]+$`, "g");
  return str.replace(regex, "");
};

export { all, alphabetical, assign, boil, callable, camel, capitalize, chain, clone, cluster, compose, construct, counting, crush, dash, debounce, defer, diff, draw, first, flat, fork, get, group, guard, inRange, intersects, invert, isArray, isDate, isEmpty, isEqual, isFloat, isFunction, isInt, isNumber, isObject, isPrimitive, isPromise, isString, isSymbol, iterate, keys, last, list, listify, lowerize, map, mapEntries, mapKeys, mapValues, max, memo, merge, min, objectify, omit, parallel, partial, partob, pascal, pick, proxied, random, range, reduce, replace, replaceOrAppend, retry, select, series, set, shake, shift, shuffle, sift, sleep, snake, sort, sum, template, throttle, title, toFloat, toInt, toggle, trim, tryit as try, tryit, uid, unique, upperize, zip, zipToObject };
