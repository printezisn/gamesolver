import { clone2DArray, getEmpty2DArray } from '../../../lib/utils';
import { StateHandler } from '../../../reducers/sudoku/types';

describe('StateHandler', () => {
  describe('constructor', () => {
    describe('when there are invalid cells', () => {
      const createState = (calculateStatus: boolean) => {
        const stateHandler = new StateHandler();
        const table = clone2DArray(stateHandler.getState().table);

        table[0][0] = table[0][1] = 1;

        return new StateHandler({ table: table }, calculateStatus).getState();
      };

      it('stores the invalid cells', () => {
        const newState = createState(true);

        expect(newState.invalidCells).toEqual({ 0: true, 1: true });
      });

      describe('when state status is not calculated', () => {
        it('does not store the invalid cells', () => {
          const newState = createState(false);

          expect(newState.invalidCells).toEqual({});
        });
      });
    });

    describe('when the table is completed', () => {
      const createState = (calculateStatus: boolean) => {
        const table = [
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

        return new StateHandler({ table }, calculateStatus).getState();
      };

      it('indicates that the table is completed', () => {
        const newState = createState(true);

        expect(newState.completed).toBeTruthy();
      });

      describe('when state status is not calculated', () => {
        it('does not indicate that the table is completed', () => {
          const newState = createState(false);

          expect(newState.completed).toBeFalsy();
        });
      });
    });
  });

  describe('getState', () => {
    it('returns the current state', () => {
      const state = new StateHandler().getState();
      const emptyTable = getEmpty2DArray<number>(9, 9);

      expect(state).toEqual({
        initialized: false,
        initialTable: emptyTable,
        table: emptyTable,
        solution: emptyTable,
        loadSolution: false,
        loading: false,
        invalidCells: {},
        completed: false,
      });
    });
  });

  describe('merge', () => {
    it('merges the current state with the new params and returns a new state', () => {
      const state = new StateHandler().merge({ loading: true }).getState();

      expect(state.loading).toBeTruthy();
    });
  });
});