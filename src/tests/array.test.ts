import { assert } from 'chai'
import * as _ from '..'

const NULL = null as unknown as unknown[]

describe('array module', () => {
  describe('group function', () => {
    test('groups by provided attribute', () => {
      const list = [
        { group: 'a', word: 'hello' },
        { group: 'b', word: 'bye' },
        { group: 'a', word: 'oh' },
        { group: 'b', word: 'hey' },
        { group: 'c', word: 'ok' }
      ]
      const groups = _.group(list, x => x.group)
      assert.equal(groups.a?.length, 2)
      assert.equal(groups.b?.length, 2)
      assert.equal(groups.c?.length, 1)
      assert.equal(groups.c?.[0].word, 'ok')
    })
  })

  describe('boil function', () => {
    test('compares and keeps item based on condition', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.boil(list, (a, b) => (a.score > b.score ? a : b))
      assert.equal(result!.game, 'e')
      assert.equal(result!.score, 500)
    })
    test('does not fail when provided array is empty', () => {
      const result = _.boil([], () => true)
      assert.isNull(result)
    })
    test('does not fail when provided array is null', () => {
      const result = _.boil(null as unknown as readonly boolean[], () => true)
      assert.isNull(result)
    })
    test('does not fail when provided array is funky shaped', () => {
      const result = _.boil({} as any, () => true)
      assert.isNull(result)
    })
  })

  describe('zip function', () => {
    test('zips an array correctly', () => {
      const result = _.zip(['a', 'b'], [1, 2], [true, false])
      assert.deepEqual(result, [
        ['a', 1, true],
        ['b', 2, false]
      ])
    })

    test('returns an empty array if nothing is passed', () => {
      // @ts-ignore
      const result = _.zip()
      assert.deepEqual(result, [])
    })
  })

  describe('zipToObject function', () => {
    test('zips to an object correctly', () => {
      const result = _.zipToObject(['a', 'b'], [1, 2])
      assert.deepEqual(result, { a: 1, b: 2 })
    })

    test('zips to an object with custom map function', () => {
      const result = _.zipToObject(['a', 'b'], (k, i) => k + i)
      assert.deepEqual(result, { a: 'a0', b: 'b1' })
    })

    test('zips to an object with only one value', () => {
      const result = _.zipToObject(['a', 'b'], 1)
      assert.deepEqual(result, { a: 1, b: 1 })
    })

    test('returns an empty object if bad parameters are passed', () => {
      // @ts-ignore
      const result = _.zipToObject()
      assert.deepEqual(result, {})
    })
  })

  describe('sum function', () => {
    test('adds list of number correctly', () => {
      const list = [5, 5, 10, 2]
      const result = _.sum(list)
      assert.equal(result, 22)
    })
    test('adds list of objects correctly using getter fn', () => {
      const list = [{ value: 5 }, { value: 5 }, { value: 10 }, { value: 2 }]
      const result = _.sum(list, x => x.value)
      assert.equal(result, 22)
    })
    test('gracefully handles null input list', () => {
      const result = _.sum(null as unknown as readonly (number | object)[])
      assert.equal(result, 0)
    })
  })

  describe('first function', () => {
    test('returns first item in list', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.first(list)
      assert.equal(result!.game, 'a')
      assert.equal(result!.score, 100)
    })
    test('returns default value without error when list is empty', () => {
      const list = [] as string[]
      const result = _.first(list, 'yolo')
      assert.equal(result, 'yolo')
    })
    test('gracefully handles null input list', () => {
      const result = _.first(NULL)
      assert.equal(result, null)
    })
  })

  describe('last function', () => {
    test('returns last item in list', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.last(list)
      assert.equal(result!.game, 'b')
      assert.equal(result!.score, 200)
    })
    test('returns default value without error when list is empty', () => {
      const list = [] as string[]
      const result = _.last(list, 'yolo')
      assert.equal(result, 'yolo')
    })
    test('gracefully handles null input list', () => {
      const result = _.last(NULL)
      assert.equal(result, null)
    })
  })

  describe('sort function', () => {
    test('uses getter', () => {
      const list = [{ index: 2 }, { index: 0 }, { index: 1 }]
      const result = _.sort(list, i => i.index)
      assert.equal(result[0].index, 0)
      assert.equal(result[1].index, 1)
      assert.equal(result[2].index, 2)
    })
    test('uses descending order', () => {
      const list = [{ index: 2 }, { index: 0 }, { index: 1 }]
      const result = _.sort(list, i => i.index, true)
      assert.equal(result[0].index, 2)
      assert.equal(result[1].index, 1)
      assert.equal(result[2].index, 0)
    })
    test('gracefully handles null input list', () => {
      const result = _.sort(null as any as number[], x => x)
      assert.deepEqual(result, [])
    })
  })

  describe('replace function', () => {
    test('returns empty list for null input list', () => {
      const result = _.replace(
        null as unknown as readonly string[],
        'x',
        () => false
      )
      assert.deepEqual(result, [])
    })
    test('returns the list for an undefined new item', () => {
      const result = _.replace(['a'], undefined, () => true)
      assert.deepEqual(result, ['a'])
    })
    test('returns replaced item when value is null', () => {
      const result = _.replace(['a'], null, i => i === 'a')
      assert.deepEqual(result, [null])
    })
    test('returns replaced item by index', () => {
      const result = _.replace(
        ['a', 'b', 'c', 'd'],
        'BB',
        (letter, idx) => idx === 1
      )
      assert.equal(result[1], 'BB')
    })
    test('returns copy of list with replaced item', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.replace(
        list,
        { game: 'x', score: 800 },
        item => item.game === 'a'
      )
      assert.equal(result[0].game, 'x')
      assert.equal(list[1].game, 'b')
    })
    test('returns copy of list without changing', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.replace(
        list,
        { game: 'x', score: 800 },
        item => item.game === 'XX'
      )
      assert.equal(result[0].game, 'a')
      assert.equal(list[1].game, 'b')
    })
  })

  describe('objectify function', () => {
    const list = [
      { id: 'a', word: 'hello' },
      { id: 'b', word: 'bye' },
      { id: 'c', word: 'oh' },
      { id: 'd', word: 'hey' },
      { id: 'e', word: 'ok' }
    ]
    test('returns correct map of values', () => {
      const result = _.objectify(
        list,
        x => x.id,
        x => x
      )
      assert.equal(result.a.word, 'hello')
      assert.equal(result.b.word, 'bye')
    })
    test('does not fail on empty input list', () => {
      const result = _.objectify(
        [],
        (x: any) => x.id,
        x => x
      )
      assert.deepEqual(result, {})
    })
    test('defaults value to array item', () => {
      const result = _.objectify(list.slice(0, 1), x => x.id)
      assert.deepEqual(result, {
        a: { id: 'a', word: 'hello' }
      })
    })
  })

  describe('select function', () => {
    test('does not fail on bad input', () => {
      assert.deepEqual(
        _.select(
          null as unknown as any[],
          x => x,
          x => x
        ),
        []
      )
      assert.deepEqual(
        _.select(
          undefined as unknown as any[],
          x => x,
          x => x
        ),
        []
      )
    })
    test('returns mapped and filtered values', () => {
      const list = [
        { group: 'a', word: 'hello' },
        { group: 'b', word: 'bye' },
        { group: 'a', word: 'oh' },
        { group: 'b', word: 'hey' },
        { group: 'c', word: 'ok' }
      ]
      const result = _.select(
        list,
        x => x.word,
        x => x.group === 'a'
      )
      assert.deepEqual(result, ['hello', 'oh'])
    })
    test('does not fail on empty input list', () => {
      const list: any[] = []
      const result = _.select(
        list,
        (x: any) => x.word,
        x => x.group === 'a'
      )
      assert.deepEqual(result, [])
    })
    test('works with index', () => {
      const letters = ['a', 'b', 'c', 'd']
      const result = _.select(
        letters,
        (l, idx) => `${l}${idx}`,
        (l, idx) => idx > 1
      )
      assert.deepEqual(result, ['c2', 'd3'])
    })
  })

  describe('max function', () => {
    test('returns the max value from list of number', () => {
      const list = [5, 5, 10, 2]
      const result = _.max(list)
      assert.equal(result, 10)
    })
    test('returns the max value from list of objects', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.max(list, x => x.score)
      assert.equal(result!.game, 'e')
      assert.equal(result!.score, 500)
    })
  })

  describe('min function', () => {
    test('returns the min value from list of number', () => {
      const list = [5, 5, 10, 2]
      const result = _.min(list)
      assert.equal(result, 2)
    })
    test('returns the min value from list of objects', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.min(list, x => x.score)
      assert.equal(result!.game, 'a')
      assert.equal(result!.score, 100)
    })
  })

  describe('cluster function', () => {
    test('returns an array of arrays', () => {
      const list = [1, 1, 1, 1, 1, 1, 1, 1]
      const result = _.cluster(list)
      const [a, b, c] = result
      assert.deepEqual(a, [1, 1])
      assert.deepEqual(b, [1, 1])
      assert.deepEqual(c, [1, 1])
    })
    test('returns remainder in final cluster', () => {
      const list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2]
      const result = _.cluster(list, 3)
      const [a, b, c, d] = result
      assert.deepEqual(a, [1, 1, 1])
      assert.deepEqual(b, [1, 1, 1])
      assert.deepEqual(c, [1, 1, 1])
      assert.deepEqual(d, [2, 2])
    })
  })

  describe('unique function', () => {
    test('correctly removed duplicate items', () => {
      const list = [1, 1, 2]
      const result = _.unique(list)
      assert.deepEqual(result, [1, 2])
    })
    test('uses key fn to correctly remove duplicate items', () => {
      const list = [
        { id: 'a', word: 'hello' },
        { id: 'a', word: 'hello' },
        { id: 'b', word: 'oh' },
        { id: 'b', word: 'oh' },
        { id: 'c', word: 'yolo' }
      ]
      const result = _.unique(list, x => x.id)
      const [a, b, c] = result
      assert.equal(a.id, 'a')
      assert.equal(a.word, 'hello')
      assert.equal(b.id, 'b')
      assert.equal(b.word, 'oh')
      assert.equal(c.id, 'c')
      assert.equal(c.word, 'yolo')
    })
    test('correctly handles non string, number or symbol values', () => {
      const list = [
        null,
        null,
        true,
        true,
        "true",
        false,
        { id: 'a', word: 'hello' },
        { id: 'a', word: 'hello' },
      ]
      const result = _.unique(list)
      assert.deepEqual(result, [
        null,
        true,
        "true",
        false,
        { id: 'a', word: 'hello' },
        { id: 'a', word: 'hello' },
      ])
    })
  })

  describe('range function', () => {
    const obj = { name: 'radash' }
    const toList = <T>(gen: Generator<T>): T[] => {
      let items: T[] = []
      for (const item of gen) items.push(item)
      return items
    }

    test('yields expected values', () => {
      assert.deepEqual(toList(_.range(0, 4)), [0, 1, 2, 3, 4])
      assert.deepEqual(toList(_.range(3)), [0, 1, 2, 3])
      assert.deepEqual(toList(_.range(0, 3)), [0, 1, 2, 3])
      assert.deepEqual(toList(_.range(0, 3, 'y')), ['y', 'y', 'y', 'y'])
      assert.deepEqual(toList(_.range(0, 3, () => 'y')), ['y', 'y', 'y', 'y'])
      assert.deepEqual(toList(_.range(0, 3, i => i)), [0, 1, 2, 3])
      assert.deepEqual(toList(_.range(0, 3, i => `y${i}`)), [
        'y0',
        'y1',
        'y2',
        'y3'
      ])
      assert.deepEqual(toList(_.range(0, 3, obj)), [obj, obj, obj, obj])
      assert.deepEqual(toList(_.range(0, 6, i => i, 2)), [0, 2, 4, 6])
    })
  })

  describe('list function', () => {
    const obj = { name: 'radash' }
    test('creates correct list', () => {
      assert.deepEqual(_.list(0, 4), [0, 1, 2, 3, 4])
      assert.deepEqual(_.list(3), [0, 1, 2, 3])
      assert.deepEqual(_.list(0, 3), [0, 1, 2, 3])
      assert.deepEqual(_.list(0, 3, 'y'), ['y', 'y', 'y', 'y'])
      assert.deepEqual(
        _.list(0, 3, () => 'y'),
        ['y', 'y', 'y', 'y']
      )
      assert.deepEqual(
        _.list(0, 3, i => i),
        [0, 1, 2, 3]
      )
      assert.deepEqual(
        _.list(0, 3, i => `y${i}`),
        ['y0', 'y1', 'y2', 'y3']
      )
      assert.deepEqual(_.list(0, 3, obj), [obj, obj, obj, obj])
      assert.deepEqual(
        _.list(0, 6, i => i, 2),
        [0, 2, 4, 6]
      )
    })
    test('omits end if step does not land on it', () => {
      const result = _.list(0, 5, i => i, 2)
      assert.deepEqual(result, [0, 2, 4])
    })
    test('returns start only if step larger than end', () => {
      const result = _.list(0, 5, i => i, 20)
      assert.deepEqual(result, [0])
    })
  })

  describe('flat function', () => {
    test('returns all items in all arrays', () => {
      const lists = [['a', 'b'], ['c', 'd'], ['e']]
      const result = _.flat(lists)
      assert.deepEqual(result, ['a', 'b', 'c', 'd', 'e'])
      assert.equal(result[0], 'a')
      assert.equal(result[4], 'e')
    })
  })

  describe('intersects function', () => {
    test('returns true if list a & b have items in common', () => {
      const listA = ['a', 'b']
      const listB = [1, 2, 'b', 'x']
      const result = _.intersects(listA, listB)
      assert.isTrue(result)
    })
    test('returns false if list a & b have no items in common', () => {
      const listA = ['a', 'b', 'c']
      const listB = ['x', 'y']
      const result = _.intersects(listA, listB)
      assert.isFalse(result)
    })
    test('returns true using custom identity', () => {
      const listA = [{ value: 23 }, { value: 12 }]
      const listB = [{ value: 12 }]
      const result = _.intersects(listA, listB, x => x.value)
      assert.isTrue(result)
    })
    test('returns false without failing if either list is null', () => {
      assert.isFalse(_.intersects(null as unknown as never, []))
      assert.isFalse(_.intersects([], null as unknown as never))
    })
  })

  describe('fork function', () => {
    test('returns two empty arrays for null input', () => {
      const [a, b] = _.fork(NULL, x => !!x)
      assert.deepEqual(a, [])
      assert.deepEqual(b, [])
    })
    test('returns two empty arrays for one empty array input', () => {
      const [a, b] = _.fork([], x => !!x)
      assert.deepEqual(a, [])
      assert.deepEqual(b, [])
    })
    test('returns correctly forked list', () => {
      const input = [
        { name: 'ray', group: 'X' },
        { name: 'sara', group: 'X' },
        { name: 'bo', group: 'Y' },
        { name: 'mary', group: 'Y' }
      ]
      const [xs, ys] = _.fork(input, x => x.group === 'X')
      assert.lengthOf(xs, 2)
      assert.lengthOf(ys, 2)
      const [r, s] = xs
      assert.equal(r.name, 'ray')
      assert.equal(s.name, 'sara')
      const [b, m] = ys
      assert.equal(b.name, 'bo')
      assert.equal(m.name, 'mary')
    })
  })

  describe('merge function', () => {
    test('returns empty array for two null inputs', () => {
      const result = _.merge(NULL, NULL, x => '')
      assert.deepEqual(result, [])
    })
    test('returns an empty array for two empty array inputs', () => {
      const result = _.merge([], [], x => '')
      assert.deepEqual(result, [])
    })
    test('returns root for a null other input', () => {
      const result = _.merge([], NULL, x => '')
      assert.deepEqual(result, [])
    })
    test('returns empty array for a null root input', () => {
      const result = _.merge(NULL, [], x => '')
      assert.deepEqual(result, [])
    })
    test('returns root for a null matcher input', () => {
      const result = _.merge(
        ['a'],
        [],
        null as unknown as (x: string) => string
      )
      assert.deepEqual(result, ['a'])
    })
    test('returns correctly mergeped lists', () => {
      const inputA = [
        { name: 'ray', group: 'X' },
        { name: 'sara', group: 'X' },
        { name: 'bo', group: 'Y' },
        { name: 'mary', group: 'Y' }
      ]
      const inputB = [
        { name: 'ray', group: 'XXX' },
        { name: 'mary', group: 'YYY' }
      ]
      const result = _.merge(inputA, inputB, x => x.name)
      assert.equal(result[0].group, 'XXX')
      assert.equal(result[1].group, 'X')
      assert.equal(result[2].group, 'Y')
      assert.equal(result[3].group, 'YYY')
    })
  })

  describe('replaceOrAppend', () => {
    const letters = ['a', 'b', 'c', 'd', 'e']
    const lettersXA = ['XA', 'b', 'c', 'd', 'e']
    const lettersXC = ['a', 'b', 'XC', 'd', 'e']
    const lettersXE = ['a', 'b', 'c', 'd', 'XE']
    const lettersXX = ['a', 'b', 'c', 'd', 'e', 'XX']
    test('returns empty array for two null inputs', () => {
      const result = _.replaceOrAppend(NULL, null, x => false)
      assert.deepEqual(result, [])
    })
    test('returns array with new item for null list input', () => {
      const result = _.replaceOrAppend(NULL, 'a', x => false)
      assert.deepEqual(result, ['a'])
    })
    test('returns list for null new item input', () => {
      const result = _.replaceOrAppend(['a'], null, x => false)
      assert.deepEqual(result, ['a'])
    })
    test('returns list with item replacing match by index', () => {
      const result = _.replaceOrAppend(
        ['a', 'b', 'c', 'd'],
        'BB',
        (letter, idx) => idx === 1
      )
      assert.equal(result[1], 'BB')
    })
    test('returns list with item replacing match', () => {
      const result = _.replaceOrAppend(letters, 'XA', x => x === 'a')
      assert.deepEqual(result, lettersXA)
    })
    test('returns list with item replacing match in middle', () => {
      const result = _.replaceOrAppend(letters, 'XC', x => x === 'c')
      assert.deepEqual(result, lettersXC)
    })
    test('returns list with item replacing match at end', () => {
      const result = _.replaceOrAppend(letters, 'XE', x => x === 'e')
      assert.deepEqual(result, lettersXE)
    })
    test('returns list with item appended', () => {
      const result = _.replaceOrAppend(letters, 'XX', x => x === 'x')
      assert.deepEqual(result, lettersXX)
    })
  })

  describe('sift', () => {
    const people = [null, 'hello', undefined, false, 23]
    test('returns empty array for null input array', () => {
      const result = _.sift(NULL)
      assert.deepEqual(result, [])
    })
    test('returns array with falsy values filtered out', () => {
      const result = _.sift(people)
      assert.deepEqual(result, ['hello', 23])
    })
  })

  describe('iterate function', () => {
    test('iterates correct number of times', () => {
      const result = _.iterate(5, (acc, idx) => acc + idx, 0)
      assert.equal(result, 15)
    })
  })

  describe('diff function', () => {
    test('handles null root', () => {
      const result = _.diff(NULL, ['a'])
      assert.deepEqual(result, ['a'])
    })
    test('handles null other', () => {
      const result = _.diff(['a'], NULL)
      assert.deepEqual(result, ['a'])
    })
    test('handles null inputs', () => {
      const result = _.diff(NULL, NULL)
      assert.deepEqual(result, [])
    })
    test('handles empty array root', () => {
      const result = _.diff([], ['a'])
      assert.deepEqual(result, [])
    })
    test('handles empty array other', () => {
      const result = _.diff(['a'], [])
      assert.deepEqual(result, ['a'])
    })
    test('returns all items from root that dont exist in other', () => {
      const result = _.diff(['a', 'b', 'c'], ['c', 'd', 'e'])
      assert.deepEqual(result, ['a', 'b'])
    })
    test('uses identity function', () => {
      const identity = ({ letter }: { letter: string }) => letter
      const letter = (l: string) => ({ letter: l })
      const result = _.diff(
        [letter('a'), letter('b'), letter('c')],
        [letter('c'), letter('d'), letter('e')],
        identity
      )
      assert.deepEqual(result, [letter('a'), letter('b')])
    })
  })

  describe('alphabetical function', () => {
    test('uses getter', () => {
      const list = [{ name: 'Leo' }, { name: 'AJ' }, { name: 'Cynthia' }]
      const result = _.alphabetical(list, i => i.name)
      assert.equal(result[0].name, 'AJ')
      assert.equal(result[1].name, 'Cynthia')
      assert.equal(result[2].name, 'Leo')
    })
    test('uses descending order', () => {
      const list = [{ name: 'Leo' }, { name: 'AJ' }, { name: 'Cynthia' }]
      const result = _.alphabetical(list, i => i.name, 'desc')
      assert.equal(result[0].name, 'Leo')
      assert.equal(result[1].name, 'Cynthia')
      assert.equal(result[2].name, 'AJ')
    })
    test('gracefully handles null input list', () => {
      const result = _.alphabetical(null as any as string[], x => x)
      assert.deepEqual(result, [])
    })
  })

  describe('counting function', () => {
    const people = [
      { name: 'ray', group: 'X' },
      { name: 'sara', group: 'X' },
      { name: 'bo', group: 'Y' },
      { name: 'mary', group: 'Y' }
    ]
    test('returns correctly counted items object', () => {
      const result = _.counting(people, p => p.group)
      assert.deepEqual(result, {
        X: 2,
        Y: 2
      })
    })
    test('does not error on bad input', () => {
      _.counting(null as unknown as number[], x => x)
      _.counting(undefined as unknown as number[], x => x)
    })
  })

  describe('shift function', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    test('should shift array right 3 positions', () => {
      const result = _.shift(arr, 3)
      assert.deepEqual(result, [7, 8, 9, 1, 2, 3, 4, 5, 6])
    })
    test('should shift array left 3 positions', () => {
      const result = _.shift(arr, -3)
      assert.deepEqual(result, [4, 5, 6, 7, 8, 9, 1, 2, 3])
    })
    test('should shift array right 6 positions', () => {
      const result = _.shift(arr, 15)
      assert.deepEqual(result, [4, 5, 6, 7, 8, 9, 1, 2, 3])
    })
    test('should shift array left 6 positions', () => {
      const result = _.shift(arr, -15)
      assert.deepEqual(result, [7, 8, 9, 1, 2, 3, 4, 5, 6])
    })
    test('should keep array as is', () => {
      const result = _.shift(arr, 0)
      assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    test('should keep array as is', () => {
      const result = _.shift(arr, 9)
      assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    test('should return empty array', () => {
      const results = _.shift([], 0)
      assert.deepEqual(results, [])
    })
    test('should return empty array', () => {
      const results = _.shift([], 10)
      assert.deepEqual(results, [])
    })
  })

  describe('toggle function', () => {
    test('should handle null input list', () => {
      const result = _.toggle(null as unknown as any[], 'a')
      assert.deepEqual(result, ['a'])
    })
    test('should handle null input list and null item', () => {
      const result = _.toggle(null as unknown as any[], null)
      assert.deepEqual(result, [])
    })
    test('should handle null item', () => {
      const result = _.toggle(['a'], null)
      assert.deepEqual(result, ['a'])
    })
    test('should add item when it does not exist using default matcher', () => {
      const result = _.toggle(['a'], 'b')
      assert.deepEqual(result, ['a', 'b'])
    })
    test('should remove item when it does exist using default matcher', () => {
      const result = _.toggle(['a', 'b'], 'b')
      assert.deepEqual(result, ['a'])
    })
    test('should remove item when it does exist using custom matcher', () => {
      const result = _.toggle(
        [{ value: 'a' }, { value: 'b' }],
        { value: 'b' },
        v => v.value
      )
      assert.deepEqual(result, [{ value: 'a' }])
    })
    test('should add item when it does not exist using custom matcher', () => {
      const result = _.toggle([{ value: 'a' }], { value: 'b' }, v => v.value)
      assert.deepEqual(result, [{ value: 'a' }, { value: 'b' }])
    })
    test('should prepend item when strategy is set', () => {
      const result = _.toggle(['a'], 'b', null, { strategy: 'prepend' })
      assert.deepEqual(result, ['b', 'a'])
    })
  })
})
