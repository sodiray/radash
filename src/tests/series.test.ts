import { assert } from 'chai'
import * as _ from '..'

describe('series module', () => {
  type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
  const sut = _.series<Weekday>([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday'
  ])

  describe('min function', () => {
    test('correctly returns min', () => {
      const result = sut.min('monday', 'tuesday')
      assert.equal(result, 'monday')
    })
    test('correctly returns min when second arg', () => {
      const result = sut.min('tuesday', 'monday')
      assert.equal(result, 'monday')
    })
  })

  describe('max function', () => {
    test('correctly returns max', () => {
      const result = sut.max('thursday', 'tuesday')
      assert.equal(result, 'thursday')
    })
    test('correctly returns max when second arg', () => {
      const result = sut.max('tuesday', 'thursday')
      assert.equal(result, 'thursday')
    })
  })

  describe('first function', () => {
    test('returns first item', () => {
      const result = sut.first()
      assert.equal(result, 'monday')
    })
  })

  describe('last function', () => {
    test('returns last item', () => {
      const result = sut.last()
      assert.equal(result, 'friday')
    })
  })

  describe('next function', () => {
    test('returns next item', () => {
      const result = sut.next('wednesday')
      assert.equal(result, 'thursday')
    })
    test('returns first given last exhausted', () => {
      const result = sut.next('friday')
      assert.equal(result, 'monday')
    })
  })

  describe('previous function', () => {
    test('returns previous item', () => {
      const result = sut.previous('wednesday')
      assert.equal(result, 'tuesday')
    })
    test('returns last given first exhausted', () => {
      const result = sut.previous('monday')
      assert.equal(result, 'friday')
    })
  })

  describe('spin function', () => {
    test('returns current given zero', () => {
      const result = sut.spin('wednesday', 0)
      assert.equal(result, 'wednesday')
    })
    test('returns friday given -3 starting at wednesday', () => {
      const result = sut.spin('wednesday', -3)
      assert.equal(result, 'friday')
    })
    test('returns monday given 3 starting at wednesday', () => {
      const result = sut.spin('wednesday', 3)
      assert.equal(result, 'monday')
    })
    test('returns monday given 13 starting at wednesday', () => {
      const result = sut.spin('wednesday', 13)
      assert.equal(result, 'monday')
    })
  })
})
