import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from 'react';
import { GENERATE_SUDOKU_ACTION, UPDATE_CELL_ACTION } from './constants';
import { Action, State } from './types';

const emptyTable = Array(9).fill(Array(9).fill(null));

const initialState: State = {
  initialTable: emptyTable,
  table: emptyTable,
  solution: emptyTable,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case UPDATE_CELL_ACTION:
      const { row, col, value } = action.payload;
      const newTable = [...state.table];
      newTable[row] = [...state.table[row]];
      newTable[row][col] = value;

      return {
        ...state,
        table: newTable,
      };
    case GENERATE_SUDOKU_ACTION:
      const { table, solution } = action.payload;

      return {
        ...state,
        initialTable: table,
        table,
        solution,
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

export const useSudoku = () => useContext(context);
export const useSudokuDispatch = () => useContext(dispatchContext) as Dispatch<Action>;