/**
 * Returns a random number which is between 0 and a maximum number
 * 
 * @param max The maximum number
 * @returns The generated random number
 */
export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

/**
 * Generates and returns a 2D array with null in each cell
 * 
 * @param totalRows The total rows of the array
 * @param totalCols The total columns of the array
 * @returns The generated 2D array
 */
export const getEmpty2DArray = <T>(totalRows: number, totalCols: number): (T | null)[][] => {
  return [...Array(totalRows)].map(() => Array(totalCols).fill(null));
};

/**
 * Clones and returns a 2D array
 * 
 * @param arr The 2D array to clone
 * @returns the 2D array clone
 */
export const clone2DArray = <T>(arr: (T | null)[][]) => {
  const newArr = [...arr];

  for (let i = 0; i < newArr.length; i++) {
    newArr[i] = [...arr[i]];
  }

  return newArr;
};