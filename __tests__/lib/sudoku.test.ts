import { Difficulty, findInvalidCells, generate, solve } from '../../lib/sudoku';

const defaultSolutionStr = '426198537389754612751623498915237846643985271872416953534861729267349185198572364';
const defaultSolution = [
  [4, 2, 6, 1, 9, 8, 5, 3, 7],
  [3, 8, 9, 7, 5, 4, 6, 1, 2],
  [7, 5, 1, 6, 2, 3, 4, 9, 8],
  [9, 1, 5, 2, 3, 7, 8, 4, 6],
  [6, 4, 3, 9, 8, 5, 2, 7, 1],
  [8, 7, 2, 4, 1, 6, 9, 5, 3],
  [5, 3, 4, 8, 6, 1, 7, 2, 9],
  [2, 6, 7, 3, 4, 9, 1, 8, 5],
  [1, 9, 8, 5, 7, 2, 3, 6, 4],
];

describe('Sudoku Lib', () => {
  describe('generate', () => {
    const calculateTotalVisibleCells = (table: (number | null)[][]) => {
      let totalVisibleCells = 0;

      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          if (table[i][j] != null) {
            totalVisibleCells++;
          }
        }
      }

      return totalVisibleCells;
    };

    it('returns sudoku table with easy difficulty', () => {
      const { table, solution } = generate(Difficulty.Easy);

      expect(calculateTotalVisibleCells(table)).toEqual(40);
      expect(solution).toEqual(defaultSolution);
    });

    it('returns sudoku table with normal difficulty', () => {
      const { table, solution } = generate(Difficulty.Normal);

      expect(calculateTotalVisibleCells(table)).toEqual(35);
      expect(solution).toEqual(defaultSolution);
    });

    it('returns sudoku table with hard difficulty', () => {
      const { table, solution } = generate(Difficulty.Hard);

      expect(calculateTotalVisibleCells(table)).toEqual(30);
      expect(solution).toEqual(defaultSolution);
    });
  });

  describe('findInvalidCells', () => {
    it('returns the invalid cells', () => {
      const table = [
        [4, 2, 6, 1, 9, 8, 5, 3, 7],
        [3, 6, 9, 7, 5, 4, 6, 1, 2],
        [7, 5, 1, 6, 2, 3, 4, 9, 8],
        [9, 1, 5, 2, 3, 7, 8, 4, 6],
        [6, 4, 3, 9, 8, 5, 2, 7, 1],
        [8, 7, 2, 4, 1, 6, 9, 5, 3],
        [5, 3, 4, 8, 6, 1, 7, 2, 9],
        [2, 6, 7, 3, 4, 9, 1, 8, 5],
        [1, 9, 8, 5, 7, 2, 3, 6, 4],
      ];

      const invalidCells = findInvalidCells(table);

      expect(invalidCells).toEqual({ '2': true, '10': true, '15': true, '64': true });
    });
  });

  describe('solve', () => {
    describe('when the operation is successful', () => {
      beforeEach(() => {
        global.fetch = jest.fn(() => 
          Promise.resolve({
            json: () => Promise.resolve({ success: true, solution: defaultSolutionStr }),
          }),
        ) as jest.Mock;
      });

      it('returns the solution table', async () => {
        expect(await solve([])).toEqual(defaultSolution);
      });
    });

    describe('when the operation is not successful', () => {
      beforeEach(() => {
        global.fetch = jest.fn(() => 
          Promise.resolve({
            json: () => Promise.resolve({ success: false }),
          }),
        ) as jest.Mock;
      });

      it('returns the solution table', async () => {
        expect(await solve([])).toBeNull();
      });
    });
  });
});