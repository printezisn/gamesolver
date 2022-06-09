import * as sudokuLib from '../../../lib/sudoku';
import * as localStorage from '../../../lib/localStorage';
import { generateEmptySudoku, generateSudoku, initializeSudoku, solveSudoku, storeSudoku, updateCell } from '../../../reducers/sudoku/actions';
import { GENERATE_EMPTY_SUDOKU_ACTION, GENERATE_SUDOKU_ACTION, INITIALIZE_SUDOKU_ACTION, LOCAL_STORAGE_STATE_KEY, SET_LOADING_ACTION, SET_SUDOKU_SOLUTION_ACTION, SOLVE_SUDOKU_ACTION, UPDATE_CELL_ACTION } from '../../../reducers/sudoku/constants';
import { createNewState } from '../../../reducers/sudoku/types';

let dispatchCalls: any[] = [];
const dispatch = (input: any) => dispatchCalls.push(input);

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

afterEach(() => {
  dispatchCalls = [];

  jest.clearAllMocks();
});

describe('Sudoku reducer action', () => {
  describe('updateCell', () => {
    const row = 1, col = 2;

    describe('when the value is not a number', () => {
      const value = 'invalid';

      it('updates the cell with an empty value', () => {
        updateCell(row, col, value, dispatch);

        expect(dispatchCalls).toEqual([{
          type: UPDATE_CELL_ACTION,
          payload: { row, col, value: null },
        }]);
      });
    });

    describe('when the value is 0', () => {
      const value = '0';

      it('updates the cell with an empty value', () => {
        updateCell(row, col, value, dispatch);

        expect(dispatchCalls).toEqual([{
          type: UPDATE_CELL_ACTION,
          payload: { row, col, value: null },
        }]);
      });
    });

    describe('when the value is valid', () => {
      const value = '5';

      it('updates the cell with an empty value', () => {
        updateCell(row, col, value, dispatch);

        expect(dispatchCalls).toEqual([{
          type: UPDATE_CELL_ACTION,
          payload: { row, col, value: parseInt(value) },
        }]);
      });
    });
  });

  describe('generateSudoku', () => {
    const spy = jest.spyOn(sudokuLib, 'generate');

    beforeEach(() => {
      spy.mockImplementation(() => ({ table: [], solution: [] }));
    });

    it('generates a new sudoku table', () => {
      generateSudoku(sudokuLib.Difficulty.Easy, dispatch);

      expect(spy).toHaveBeenCalledWith(sudokuLib.Difficulty.Easy);
      expect(dispatchCalls).toEqual([{ type: GENERATE_SUDOKU_ACTION, payload: { table: [], solution: [] } }]);
    });
  });

  describe('generateEmptySudoku', () => {
    it('generates a new empty sudoku table', () => {
      generateEmptySudoku(dispatch);

      expect(dispatchCalls).toEqual([{ type: GENERATE_EMPTY_SUDOKU_ACTION }]);
    });
  });

  describe('solveSudoku', () => {
    describe('when the solution must be loaded', () => {
      const state = createNewState({ loadSolution: true });

      beforeEach(() => {
        jest.spyOn(sudokuLib, 'solve').mockImplementation(() => Promise.resolve(defaultSolution));
      });

      it('loads the solutions and sets it', async () => {
        await solveSudoku(state, dispatch);

        expect(dispatchCalls).toEqual([
          { type: SET_LOADING_ACTION, payload: true },
          { type: SET_SUDOKU_SOLUTION_ACTION, payload: defaultSolution },
          { type: SET_LOADING_ACTION, payload: false },
          { type: SOLVE_SUDOKU_ACTION },
        ]);
      });
    });

    describe('when the solution must not be loaded', () => {
      const state = createNewState();

      it('sets the existing solution', async () => {
        await solveSudoku(state, dispatch);

        expect(dispatchCalls).toEqual([{ type: SOLVE_SUDOKU_ACTION }]);
      });
    });
  });

  describe('initializeSudoku', () => {
    describe('when there is an existing state in local storage', () => {
      const state = { stored: true };
      const spy = jest.spyOn(localStorage, 'fetchFromLocalStorage');

      beforeEach(() => {
        spy.mockImplementation(() => state);
      });

      it('initializes the sudoku with the existing state', () => {
        initializeSudoku(dispatch);

        expect(dispatchCalls).toEqual([{ type: INITIALIZE_SUDOKU_ACTION, payload: state }]);
      });
    });

    describe('when there is not an existing state in local storage', () => {
      const localStorageSpy = jest.spyOn(localStorage, 'fetchFromLocalStorage');
      const sudokuLibSpy = jest.spyOn(sudokuLib, 'generate');

      beforeEach(() => {
        localStorageSpy.mockImplementation(() => null);
        sudokuLibSpy.mockImplementation(() => ({ table: [], solution: [] }));
      });

      it('generates a new sudoku table', () => {
        initializeSudoku(dispatch);

        expect(dispatchCalls).toEqual([{ type: GENERATE_SUDOKU_ACTION, payload: { table: [], solution: [] } }]);
      });
    });
  });

  describe('storeSudoku', () => {
    const state = createNewState();
    const spy = jest.spyOn(localStorage, 'storeToLocalStorage');

    beforeEach(() => {
      spy.mockImplementation(() => {});
    });

    it('stores the current sudoku state to local storage', () => {
      storeSudoku(state);

      const { table, initialTable, solution, loadSolution } = state;

      expect(spy).toHaveBeenCalledWith(LOCAL_STORAGE_STATE_KEY, { table, initialTable, solution, loadSolution });
    });
  });
});