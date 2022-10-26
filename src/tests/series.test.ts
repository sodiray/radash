import { assert } from 'chai'
import * as _ from '..'

describe('series module', () => {
  type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
  const sut = _.series<Weekday>(
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday'
  )

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
    test('returns null by default if exhausted', () => {
      const result = sut.next('friday')
      assert.equal(result, null)
    })
    test('returns given default if exhausted', () => {
      const result = sut.next('friday', 'monday')
      assert.equal(result, 'monday')
    })
  })

  describe('previous function', () => {
    test('returns previous item', () => {
      const result = sut.previous('wednesday')
      assert.equal(result, 'tuesday')
    })
    test('returns null by default if exhausted', () => {
      const result = sut.previous('monday')
      assert.equal(result, null)
    })
    test('returns given default if exhausted', () => {
      const result = sut.previous('monday', 'friday')
      assert.equal(result, 'friday')
    })
  })
})
