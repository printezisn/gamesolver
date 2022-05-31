/**
 * Returns a random number which is between 0 and a maximum number
 * 
 * @param max The maximum number
 * @returns The generated random number
 */
export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};