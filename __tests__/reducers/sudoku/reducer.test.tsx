import { FC, ReactNode, useEffect } from 'react';
import { render } from '@testing-library/react';
import { GENERATE_EMPTY_SUDOKU_ACTION, GENERATE_SUDOKU_ACTION, INITIALIZE_SUDOKU_ACTION, SET_SUDOKU_SOLUTION_ACTION, SOLVE_SUDOKU_ACTION, UPDATE_CELL_ACTION } from '../../../reducers/sudoku/constants';
import { SudokuProvider, useSudoku, useSudokuDispatch } from '../../../reducers/sudoku/reducer';
import { State } from '../../../reducers/sudoku/types';
import { getEmpty2DArray } from '../../../lib/utils';

const defaultSolution = [
  [4, 2, 6, 1, 9, 8, 5, 3, 7],
  [3, 8, 9, 7, 5, 4, 6, 1, 2],
  [7, 5, 1, 6, 2, 3, 4, 9, 8],
  [9, 1, 5, 2, 3, 7, 8, 4, 6],
  [6, 4, 3, 9, 8, 5, 2, 7, 1],
  [8, 7, 2, 4, 1, 6, 9, 5, 3],
  [5, 3, 4, 8, 6, 1, 7, 2, 9],
  [2, 6, 7, 3, 4, 9, 1, 8, 5],
  [1, 9, 8, 5, 7, 2, 3, 6, 4],
];

const defaultInitialTable = [
  [4, null, null, null, null, null, null, null, null],
  [null, 8, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
];

const emptyTable = getEmpty2DArray(9, 9);

interface WrapperProps {
  children: ReactNode
}

const Wrapper: FC<WrapperProps> = ({ children }) => <SudokuProvider>{children}</SudokuProvider>;

describe('Sudoku reducer', () => {
  describe('Update cell action', () => {
    describe('when a single cell is updated', () => {
      let newState: State;

      const Component: FC = () => {
        const dispatch = useSudokuDispatch();
        newState = useSudoku();

        useEffect(() => {
          dispatch({ type: UPDATE_CELL_ACTION, payload: { row: 1, col: 2, value: 3 } });
        }, [dispatch]);

        return <div></div>;
      };

      beforeEach(() => render(<Wrapper><Component /></Wrapper>));

      it('updates the cell', () => {
        expect(newState.table[1][2]).toEqual(3);
        expect(newState.completed).toBeFalsy();
        expect(newState.invalidCells).toEqual({});
      });
    });

    describe('when all cells are updated', () => {
      let newState: State;

      const Component: FC = () => {
        const dispatch = useSudokuDispatch();
        newState = useSudoku();

        useEffect(() => {
          for (let i = 0; i < defaultSolution.length; i++) {
            for (let j = 0; j < defaultSolution[i].length; j++) {
              dispatch({ type: UPDATE_CELL_ACTION, payload: { row: i, col: j, value: defaultSolution[i][j] } });
            }
          }
        }, [dispatch]);

        return <div></div>;
      };

      beforeEach(() => render(<Wrapper><Component /></Wrapper>));

      it('updates the cells and marks the sudoku as completed', () => {
        expect(newState.table).toEqual(defaultSolution);
        expect(newState.completed).toBeTruthy();
        expect(newState.invalidCells).toEqual({});
      });
    });

    describe('when an update is invalid', () => {
      let newState: State;

      const Component: FC = () => {
        const dispatch = useSudokuDispatch();
        newState = useSudoku();

        useEffect(() => {
          dispatch({ type: UPDATE_CELL_ACTION, payload: { row: 0, col: 0, value: 1 } });
          dispatch({ type: UPDATE_CELL_ACTION, payload: { row: 0, col: 1, value: 1 } });
        }, [dispatch]);

        return <div></div>;
      };

      beforeEach(() => render(<Wrapper><Component /></Wrapper>));

      it('updates the cells and keeps the invalid cells', () => {
        expect(newState.table[0][0]).toEqual(1);
        expect(newState.table[0][1]).toEqual(1);
        expect(newState.completed).toBeFalsy();
        expect(newState.invalidCells).toEqual({ 0: true, 1: true });
      });
    });
  });

  describe('Generate sudoku action', () => {
    let newState: State;

    const Component: FC = () => {
      const dispatch = useSudokuDispatch();
      newState = useSudoku();

      useEffect(() => {
        dispatch({
          type: GENERATE_SUDOKU_ACTION,
          payload: { table: defaultInitialTable, solution: defaultSolution },
        });
      }, [dispatch]);

      return <div></div>;
    };

    beforeEach(() => render(<Wrapper><Component /></Wrapper>));

    it('initializes the sudoku with a new table', () => {
      expect(newState.table).toEqual(defaultInitialTable);
      expect(newState.initialTable).toEqual(defaultInitialTable);
      expect(newState.solution).toEqual(defaultSolution);
      expect(newState.initialized).toBeTruthy();
      expect(newState.completed).toBeFalsy();
      expect(newState.invalidCells).toEqual({});
      expect(newState.loadSolution).toBeFalsy();
    });
  });

  describe('Generate empty sudoku action', () => {
    let newState: State;

    const Component: FC = () => {
      const dispatch = useSudokuDispatch();
      newState = useSudoku();

      useEffect(() => {
        dispatch({ type: GENERATE_EMPTY_SUDOKU_ACTION });
      }, [dispatch]);

      return <div></div>;
    };

    beforeEach(() => render(<Wrapper><Component /></Wrapper>));

    it('initializes the sudoku with an empty table', () => {
      expect(newState.table).toEqual(emptyTable);
      expect(newState.initialTable).toEqual(emptyTable);
      expect(newState.solution).toEqual(emptyTable);
      expect(newState.initialized).toBeTruthy();
      expect(newState.completed).toBeFalsy();
      expect(newState.invalidCells).toEqual({});
      expect(newState.loadSolution).toBeTruthy();
    });
  });

  describe('Solve sudoku action', () => {
    let newState: State;

    const Component: FC = () => {
      const dispatch = useSudokuDispatch();
      newState = useSudoku();

      useEffect(() => {
        dispatch({ type: SET_SUDOKU_SOLUTION_ACTION, payload: defaultSolution });
        dispatch({ type: SOLVE_SUDOKU_ACTION });
      }, [dispatch]);

      return <div></div>;
    };

    beforeEach(() => render(<Wrapper><Component /></Wrapper>));

    it('fills the sudoku table with the solution', () => {
      expect(newState.initialized).toBeTruthy();
      expect(newState.table).toEqual(defaultSolution);
    });
  });

  describe('Initialize sudoku action', () => {
    let newState: State;

    const Component: FC = () => {
      const dispatch = useSudokuDispatch();
      newState = useSudoku();

      useEffect(() => {
        dispatch({
          type: INITIALIZE_SUDOKU_ACTION,
          payload: {
            table: defaultInitialTable,
            initialTable: defaultInitialTable,
            solution: defaultSolution,
            loadSolution: false,
          },
        });
      }, [dispatch]);

      return <div></div>;
    };

    beforeEach(() => render(<Wrapper><Component /></Wrapper>));

    it('initializes the sudoku with the existing state', () => {
      expect(newState.initialized).toBeTruthy();
      expect(newState.initialTable).toEqual(defaultInitialTable);
      expect(newState.table).toEqual(defaultInitialTable);
      expect(newState.solution).toEqual(defaultSolution);
      expect(newState.loadSolution).toBeFalsy();
    });
  });
});