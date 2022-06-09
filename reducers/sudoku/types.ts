import { getEmpty2DArray } from '../../lib/utils';

export interface State {
  initialized: boolean,
  initialTable: (number | null)[][],
  table: (number | null)[][],
  solution: (number | null)[][],
  invalidCells: any,
  completed: boolean,
  loadSolution: boolean,
  loading: boolean,
}

/**
 * Creates and returns a new state object
 * 
 * @param params The params to overwrite
 * @returns The created state
 */
export const createNewState = (params: any = {}): State => {
  const emptyTable = getEmpty2DArray(9, 9);
  const defaultState: State = {
    initialized: false,
    initialTable: emptyTable,
    table: emptyTable,
    solution: emptyTable,
    invalidCells: {},
    completed: false,
    loadSolution: false,
    loading: false,
  };

  return { ...defaultState, ...params };
};

export interface Action {
  type: string,
  payload?: any
}