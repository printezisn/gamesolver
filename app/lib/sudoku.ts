import { getRandomNumber } from './utils';

const availableSolutions = [
  '261375894537894162948216357694751238825943671713628945356482719489167523172539486',
];

/**
 * Converts a solution string to table
 * 
 * @param solution The solution string to convert
 * @returns The solution table
 */
const convertSolutionToTable = (solution: string) => {
  const table: (number | null)[][] = [...Array(9)].map(() => Array(9).fill(null));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const index = i * 9 + j;

      table[i][j] = parseInt(solution[index]);
    }
  }

  return table;
};

/**
 * The difficulty of a sudoku table
 */
export enum Difficulty {
  Easy = 35,
  Normal = 30,
  Hard = 25,
}

/**
 * Generates and returns a new sudoku table along with its solution
 * 
 * @param difficulty The difficulty of the sudoku table
 * @returns The sudoku table along with its solution
 */
export const generate = (difficulty: Difficulty) => {
  const solution = availableSolutions[getRandomNumber(availableSolutions.length)];
  const solutionTable = convertSolutionToTable(solution);

  const visibleCells: number[] = [];
  const availableCells = [...Array(81)].map((_, i) => i);

  for (let i = 0; i < difficulty; i++) {
    const index = getRandomNumber(availableCells.length);

    visibleCells.push(availableCells[index]);
    availableCells.splice(index, 1);
  }

  const generatedTable: (number | null)[][] = [...Array(9)].map(() => Array(9).fill(null));

  visibleCells.forEach((index) => {
    const row = Math.floor(index / 9), col = index % 9;

    generatedTable[row][col] = solutionTable[row][col];
  });

  return { table: generatedTable, solution: solutionTable };
};

/**
 * Finds and returns the invalid cells inside a sudoku table
 * 
 * @param table The sudoku table to check
 * @returns The invalid cells in a json object format, to make searching faster
 */
export const findInvalidCells = (table: (number | null)[][]) => {
  const 
    boardOccurences: any = {},
    rowOccurences: any = {},
    colOccurences: any = {},
    invalidCells: any = {};

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      if (!table[i][j]) {
        continue;
      }

      const value = table[i][j] as number;
      const board = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      boardOccurences[board] = boardOccurences[board] || {};
      rowOccurences[i] = rowOccurences[i] || {};
      colOccurences[j] = colOccurences[j] || {};

      if (boardOccurences[board][value]) {
        const [boardRow, boardCol] = boardOccurences[board][value];

        invalidCells[i * 9 + j] = true;
        invalidCells[boardRow * 9 + boardCol] = true;
      }
      if (rowOccurences[i][value] != null) {
        invalidCells[i * 9 + j] = true;
        invalidCells[i * 9 + rowOccurences[i][value]] = true;
      }
      if (colOccurences[j][value] != null) {
        invalidCells[i * 9 + j] = true;
        invalidCells[colOccurences[j][value] * 9 + j] = true;
      }

      boardOccurences[board][value] = [i, j];
      rowOccurences[i][value] = j;
      colOccurences[j][value] = i;
    }
  }

  return invalidCells;
};