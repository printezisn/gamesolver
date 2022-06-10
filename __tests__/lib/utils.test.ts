import { clone2DArray, getEmpty2DArray, getRandomNumber } from '../../lib/utils';

describe('Utils', () => {
  describe('getRandomNumber', () => {
    it('returns a number', () => {
      const number = getRandomNumber(10);

      expect(number).toBeLessThan(10);
    });
  });

  describe('getEmpty2DArray', () => {
    it('returns an empty array', () => {
      const arr = getEmpty2DArray(2, 3);

      expect(arr).toEqual([[null, null, null], [null, null, null]]);
    });
  });

  describe('clone2DArray', () => {
    it('returns a clone of the original array', () => {
      const arr = [[1, 2, 3], [4, 5, 6]];
      const newArr = clone2DArray(arr);

      expect(newArr).toEqual(arr);
    });
  });
});