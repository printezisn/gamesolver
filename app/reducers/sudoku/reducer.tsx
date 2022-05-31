import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react';
import { findInvalidCells } from '../../lib/sudoku';
import { GENERATE_SUDOKU_ACTION, INITIALIZE_SUDOKU, SOLVE_SUDOKU, UPDATE_CELL_ACTION } from './constants';
import { Action, State } from './types';

const emptyTable = Array(9).fill(Array(9).fill(null));

const initialState: State = {
  initialized: false,
  initialTable: emptyTable,
  table: emptyTable,
  solution: emptyTable,
  invalidCells: [],
};

/**
 * Returns the new state after an action is applied
 * 
 * @param state The current state
 * @param action The applied action
 * @returns The new state
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case UPDATE_CELL_ACTION:
      const { row, col, value } = action.payload;
      const newTable = [...state.table];
      newTable[row] = [...newTable[row]];
      newTable[row][col] = value;

      return {
        ...state,
        table: newTable,
        invalidCells: findInvalidCells(newTable),
      };
    case GENERATE_SUDOKU_ACTION:
      const { table, solution } = action.payload;

      return {
        ...state,
        initialized: true,
        initialTable: table,
        table: table,
        solution: solution,
        invalidCells: [],
      };
    case SOLVE_SUDOKU:
      return {
        ...state,
        initialized: true,
        table: state.solution,
        invalidCells: [],
      };
    case INITIALIZE_SUDOKU:
      return {
        ...state,
        ...action.payload,
        initialized: true,
        invalidCells: findInvalidCells(action.payload.table),
      };
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

const context = createContext(initialState);
const dispatchContext = createContext<Dispatch<Action> | null>(null);

interface Props {
  children?: ReactNode
}

export const SudokuProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </context.Provider>
  );
};

/**
 * Generates and returns the context for sudoku state
 * 
 * @returns The sudoku state context
 */
export const useSudoku = () => useContext(context);

/**
 * Generates and returns the context for sudoku action dispatcher
 * 
 * @returns The sudoku action dispatcher context
 */
export const useSudokuDispatch = () => useContext(dispatchContext) as Dispatch<Action>;