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
export const getEmpty2DArray = (totalRows: number, totalCols: number): (number | null)[][] => {
  return [...Array(totalRows)].map(() => Array(totalCols).fill(null));
};

/**
 * Stores an object in local storage
 * 
 * @param key The key of the object 
 * @param obj The object to store
 */
export const storeToLocalStorage = (key: string, obj: any) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

/**
 * Fetches an object from local storage
 * 
 * @param key The key of the object
 * @returns The object or null if it wasn't found
 */
export const fetchFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  
  if (!item) {
    return null;
  }

  return JSON.parse(item);
};