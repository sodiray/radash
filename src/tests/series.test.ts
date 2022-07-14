import { assert } from "chai";
import * as _ from "..";

describe("series module", () => {

    type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

    describe('series', () => {
      const sut = _.series<Weekday>(
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday'
      )
      test('correctly returns min', () => {
        const result = sut.min('monday', 'tuesday')
        assert.equal(result, 'monday')
      })
      test('correctly returns min when second arg', () => {
        const result = sut.min('tuesday', 'monday')
        assert.equal(result, 'monday')
      })
      test('correctly returns max', () => {
        const result = sut.max('thursday', 'tuesday')
        assert.equal(result, 'thursday')
      })
      test('correctly returns max when second arg', () => {
        const result = sut.max('tuesday', 'thursday')
        assert.equal(result, 'thursday')
      })
    })

});
