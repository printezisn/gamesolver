const defaultTable = [
  [null, 6, null, 3, null, null, 8, null, 4],
  [5, 3, 7, null, 9, null, null, null, null],
  [null, 4, null, null, null, 6, 3, null, 7],
  [null, 9, null, null, 5, 1, 2, 3, 8],
  [null, null, null, null, null, null, null, null, null],
  [7, 1, 3, 6, 2, null, null, 4, null],
  [3, null, 6, 4, null, null, null, 1, null],
  [null, null, null, null, 6, null, 5, 2, 3],
  [1, null, 2, null, null, 9, null, 8, null],
];

const defaultSolution = [
  [2, 6, 1, 3, 7, 5, 8, 9, 4],
  [5, 3, 7, 8, 9, 4, 1, 6, 2],
  [9, 4, 8, 2, 1, 6, 3, 5, 7],
  [6, 9, 4, 7, 5, 1, 2, 3, 8],
  [8, 2, 5, 9, 4, 3, 6, 7, 1],
  [7, 1, 3, 6, 2, 8, 9, 4, 5],
  [3, 5, 6, 4, 8, 2, 7, 1, 9],
  [4, 8, 9, 1, 6, 7, 5, 2, 3],
  [1, 7, 2, 5, 3, 9, 4, 8, 6],
];

interface GeneratedSudoku {
  table: (number | null)[][],
  solution: number[][]
}

export const generate = () => {
  return new Promise<GeneratedSudoku>((resolve) => {
    setTimeout(() => {
      resolve({
        table: defaultTable,
        solution: defaultSolution,
      });
    }, 1000);
  });
};