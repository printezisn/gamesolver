import { Dispatch } from 'react';
import { generate } from '../../lib/sudoku';
import { GENERATE_SUDOKU_ACTION, UPDATE_CELL_ACTION } from './constants';
import { Action } from './types';

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
    payload: generate(),
  });
};