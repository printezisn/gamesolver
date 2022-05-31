import { Dispatch } from 'react';
import { Difficulty, generate } from '../../lib/sudoku';
import { fetchFromLocalStorage, storeToLocalStorage } from '../../lib/utils';
import { GENERATE_SUDOKU_ACTION, INITIALIZE_SUDOKU, LOCAL_STORAGE_STATE_KEY, SOLVE_SUDOKU, UPDATE_CELL_ACTION } from './constants';
import { Action, State } from './types';

/**
 * Updates a cell of the sudoku table
 * 
 * @param row The row of the cell to update (0-9)
 * @param col The column of the cell to update (0-9)
 * @param value The new value of the cell
 * @param dispatch Action dispatcher for reducer
 */
export const updateCell = (row: number, col: number, value: string, dispatch: Dispatch<Action>) => {
  const sanitizedValue = isNaN(parseInt(value)) ? null : parseInt(value[0]);

  dispatch({
    type: UPDATE_CELL_ACTION,
    payload: { row, col, value: sanitizedValue },
  });
};

/**
 * Generates a new sudoku table
 * 
 * @param dispatch Action dispatcher for reducer
 */
export const generateSudoku = (dispatch: Dispatch<Action>) => {
  dispatch({
    type: GENERATE_SUDOKU_ACTION,
    payload: generate(Difficulty.Easy),
  });
};

/**
 * Solves a sudoku table
 * 
 * @param dispatch Action dispatcher for reducer
 */
export const solveSudoku = (dispatch: Dispatch<Action>) => {
  dispatch({ type: SOLVE_SUDOKU });
};

/**
 * Initializes the sudoku with a stored table or a new one
 * 
 * @param dispatch Action dispatcher for reducer
 */
export const initializeSudoku = (dispatch: Dispatch<Action>) => {
  const state = fetchFromLocalStorage(LOCAL_STORAGE_STATE_KEY);
  
  if (state) {
    dispatch({
      type: INITIALIZE_SUDOKU,
      payload: state,
    });
  } else {
    generateSudoku(dispatch);
  }
};

/**
 * Stores the current sudoku
 * 
 * @param state The state of the current sudoku
 */
export const storeSudoku = (state: State) => {
  const { initialTable, table, solution } = state;

  storeToLocalStorage(LOCAL_STORAGE_STATE_KEY, { initialTable, table, solution });
};