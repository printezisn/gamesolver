import { fireEvent, render } from '@testing-library/react';
import SudokuMenu from '../../../components/sudoku/menu';
import * as sudokuReducer from '../../../reducers/sudoku/reducer';
import { StateHandler } from '../../../reducers/sudoku/types';

describe('<SudokuMenu />', () => {
  describe('when the initial menu is shown', () => {
    it('renders the initial menu buttons', () => {
      const state = new StateHandler().getState();

      jest.spyOn(sudokuReducer, 'useSudoku').mockImplementation(() => state);

      const { getByText, queryByText } = render(<SudokuMenu />);

      getByText('Solve');
      getByText('New sudoku');
      expect(queryByText('Easy')).toBeNull();
      expect(queryByText('Normal')).toBeNull();
      expect(queryByText('Hard')).toBeNull();
      expect(queryByText('Empty')).toBeNull();
      expect(queryByText('Cancel')).toBeNull();
    });

    describe('when the app is loading', () => {
      it('renders the initial menu buttons disabled', () => {
        const state = new StateHandler({ loading: true }).getState();

        jest.spyOn(sudokuReducer, 'useSudoku').mockImplementation(() => state);

        const { getByText, queryByText } = render(<SudokuMenu />);

        expect(getByText('Solve').classList.contains('disabled')).toBeTruthy();
        expect(getByText('New sudoku').classList.contains('disabled')).toBeTruthy();
        expect(queryByText('Easy')).toBeNull();
        expect(queryByText('Normal')).toBeNull();
        expect(queryByText('Hard')).toBeNull();
        expect(queryByText('Empty')).toBeNull();
        expect(queryByText('Cancel')).toBeNull();
      });
    });
  });

  describe('when the new sudoku menu is shown', () => {
    it('renders the new sudoku menu buttons', () => {
      const state = new StateHandler().getState();

      jest.spyOn(sudokuReducer, 'useSudoku').mockImplementation(() => state);

      const { getByText, queryByText } = render(<SudokuMenu />);

      fireEvent.click(getByText('New sudoku'));

      expect(queryByText('Solve')).toBeNull();
      expect(queryByText('New sudoku'));
      getByText('Easy');
      getByText('Normal');
      getByText('Hard');
      getByText('Empty');
      getByText('Cancel');
    });

    describe('when the app is loading', () => {
      it('renders the initial menu buttons disabled', () => {
        const { getByText, queryByText } = render(<SudokuMenu />);
        const state = new StateHandler({ loading: true }).getState();

        jest.spyOn(sudokuReducer, 'useSudoku').mockImplementation(() => state);

        fireEvent.click(getByText('New sudoku'));

        expect(queryByText('Solve')).toBeNull();
        expect(queryByText('New sudoku'));
        expect(getByText('Easy').classList.contains('disabled')).toBeTruthy();
        expect(getByText('Normal').classList.contains('disabled')).toBeTruthy();
        expect(getByText('Hard').classList.contains('disabled')).toBeTruthy();
        expect(getByText('Empty').classList.contains('disabled')).toBeTruthy();
        expect(getByText('Cancel').classList.contains('disabled')).toBeTruthy();
      });
    });
  });
});