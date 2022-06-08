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