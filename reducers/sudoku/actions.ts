import { Dispatch } from 'react';
import { Difficulty, generate, solve } from '../../lib/sudoku';
import { fetchFromLocalStorage, storeToLocalStorage } from '../../lib/localStorage';
import { GENERATE_EMPTY_SUDOKU_ACTION, GENERATE_SUDOKU_ACTION, INITIALIZE_SUDOKU_ACTION, LOCAL_STORAGE_STATE_KEY, SET_ERROR_ACTION, SET_LOADING_ACTION, SET_SUDOKU_SOLUTION_ACTION, SOLVE_SUDOKU_ACTION, UPDATE_CELL_ACTION } from './constants';
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
  let sanitizedValue = isNaN(parseInt(value)) ? null : parseInt(value[0]);

  if (sanitizedValue === 0) {
    sanitizedValue = null;
  }

  dispatch({
    type: UPDATE_CELL_ACTION,
    payload: { row, col, value: sanitizedValue },
  });
};

/**
 * Generates a new sudoku table
 * 
 * @param difficulty The difficulty of the new sudoku table
 * @param dispatch Action dispatcher for reducer
 */
export const generateSudoku = (difficulty: Difficulty, dispatch: Dispatch<Action>) => {
  dispatch({
    type: GENERATE_SUDOKU_ACTION,
    payload: generate(difficulty),
  });
};

/**
 * Generates a new empty sudoku table
 * 
 * @param dispatch Action dispatcher for reducer
 */
export const generateEmptySudoku = (dispatch: Dispatch<Action>) => {
  dispatch({ type: GENERATE_EMPTY_SUDOKU_ACTION });
};

/**
 * Solves a sudoku table
 * 
 * @param state The current state
 * @param dispatch Action dispatcher for reducer
 */
export const solveSudoku = async (state: State, dispatch: Dispatch<Action>) => {
  if (!state.loadSolution) {
    dispatch({ type: SOLVE_SUDOKU_ACTION });
    return;
  }

  dispatch({ type: SET_LOADING_ACTION, payload: true });

  try {
    const solution = await solve(state.table);

    if (!solution) {
      dispatch({ type: SET_ERROR_ACTION, payload: 'A solution could not be found.' });
    } else {
      dispatch({ type: SET_SUDOKU_SOLUTION_ACTION, payload: solution });
      dispatch({ type: SOLVE_SUDOKU_ACTION });
    }
    
    dispatch({ type: SET_LOADING_ACTION, payload: false });
  } catch {
    dispatch({ type: SET_ERROR_ACTION, payload: 'An error occurred. Please try again later.' });
    dispatch({ type: SET_LOADING_ACTION, payload: false });
  }
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
      type: INITIALIZE_SUDOKU_ACTION,
      payload: state,
    });
  } else {
    generateSudoku(Difficulty.Easy, dispatch);
  }
};

/**
 * Stores the current sudoku
 * 
 * @param state The state of the current sudoku
 */
export const storeSudoku = (state: State) => {
  const { initialTable, table, solution, loadSolution } = state;

  storeToLocalStorage(LOCAL_STORAGE_STATE_KEY, { initialTable, table, solution, loadSolution });
};

/**
 * Sets the error message for the current sudoku
 * 
 * @param error The error message
 * @param dispatch Action dispatcher for reducer
 */
export const setError = (error: (string | null), dispatch: Dispatch<Action>) => {
  dispatch({ type: SET_ERROR_ACTION, payload: error });
};