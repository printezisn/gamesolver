import { Dispatch } from 'react';
import { findInvalidCells, generate } from '../../lib/sudoku';
import { GENERATE_SUDOKU_ACTION, UPDATE_TABLE_ACTION } from './constants';
import { Action } from './types';

export const updateCell = (table: (number | null)[][], row: number, col: number, value: string, dispatch: Dispatch<Action>) => {
  const sanitizedValue = isNaN(parseInt(value)) ? null : parseInt(value[0]);

  const newTable = [...table];
  newTable[row] = [...newTable[row]];
  newTable[row][col] = sanitizedValue;

  dispatch({
    type: UPDATE_TABLE_ACTION,
    payload: { table: newTable, invalidCells: findInvalidCells(newTable) },
  });
};

export const generateSudoku = async (dispatch: Dispatch<Action>) => {
  const result = await generate();

  dispatch({
    type: GENERATE_SUDOKU_ACTION,
    payload: result,
  });
};