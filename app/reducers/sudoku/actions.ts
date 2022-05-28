import { Dispatch } from 'react';
import { generate } from '../../lib/sudoku';
import { GENERATE_SUDOKU_ACTION, UPDATE_CELL_ACTION } from './constants';
import { Action } from './types';

export const updateCell = (row: number, col: number, value: string, dispatch: Dispatch<Action>) => {
  const sanitizedValue = isNaN(parseInt(value)) ? null : parseInt(value[0]);

  dispatch({
    type: UPDATE_CELL_ACTION,
    payload: { row, col, value: sanitizedValue },
  });
};

export const generateSudoku = async (dispatch: Dispatch<Action>) => {
  const result = await generate();

  dispatch({
    type: GENERATE_SUDOKU_ACTION,
    payload: result,
  });
};