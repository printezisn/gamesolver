import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react';
import { findInvalidCells } from '../../lib/sudoku';
import { getEmpty2DArray } from '../../lib/utils';
import { GENERATE_EMPTY_SUDOKU_ACTION, GENERATE_SUDOKU_ACTION, INITIALIZE_SUDOKU_ACTION, SET_SUDOKU_SOLUTION_ACTION, SOLVE_SUDOKU_ACTION, UPDATE_CELL_ACTION } from './constants';
import { Action, State } from './types';

const emptyTable = getEmpty2DArray(9, 9);

const initialState: State = {
  initialized: false,
  initialTable: emptyTable,
  table: emptyTable,
  solution: emptyTable,
  invalidCells: [],
  completed: false,
  loadSolution: true,
};

/**
 * Creates and returns a new state based on the current one
 * 
 * @param state The current state
 * @param newProps The changed properties
 * @returns The new state
 */
const createState = (state: State, newProps: any): State => {
  const newState: State = { ...state, ...newProps };
  const invalidCells = findInvalidCells(newState.table);
  const completed = Object.keys(invalidCells).length === 0 && newState.table.flat().indexOf(null) < 0;

  return {
    ...newState,
    invalidCells,
    completed,
  };
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

      return createState(state, { table: newTable });
    case GENERATE_SUDOKU_ACTION:
      return createState(
        state,
        {
          initialized: true,
          initialTable: action.payload.table,
          table: action.payload.table,
          solution: action.payload.solution,
          loadSolution: false,
        },
      );
    case GENERATE_EMPTY_SUDOKU_ACTION:
      return createState(
        state,
        {
          initialized: true,
          initialTable: emptyTable,
          table: emptyTable,
          solution: emptyTable,
          loadSolution: true,
        },
      );
    case SOLVE_SUDOKU_ACTION:
      return createState(
        state,
        {
          initialized: true,
          table: state.solution,
        },
      );
    case SET_SUDOKU_SOLUTION_ACTION:
      return createState(
        state,
        {
          solution: action.payload,
        },
      );
    case INITIALIZE_SUDOKU_ACTION:
      return createState(
        state,
        {
          ...action.payload,
          initialized: true,
        },
      );
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