import { getEmpty2DArray, getRandomNumber } from '../../lib/utils';

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
});