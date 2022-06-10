import { fireEvent, render } from '@testing-library/react';
import SudokuMessage from '../../../components/sudoku/message';
import { StateHandler } from '../../../reducers/sudoku/types';
import * as sudokuReducer from '../../../reducers/sudoku/reducer';
import * as sudokuActions from '../../../reducers/sudoku/actions';

describe('<SudokuMessage />', () => {
  describe('when there is no error', () => {
    it('does not render any message', () => {
      const { container } = render(<SudokuMessage />);

      expect(container.children.length).toEqual(0);
    });
  });

  describe('when there is an error', () => {
    const dispatchSpy = jest.fn();

    beforeEach(() => {
      const state = new StateHandler({ error: 'Test error' }).getState();

      jest.spyOn(sudokuReducer, 'useSudoku').mockImplementation(() => state);
      jest.spyOn(sudokuReducer, 'useSudokuDispatch').mockImplementation(() => dispatchSpy);
    });

    it('renders the error message', () => {
      const { getByText } = render(<SudokuMessage />);

      getByText('Test error', { exact: false });
    });

    it('allows the user to remove the error', () => {
      const spy = jest.spyOn(sudokuActions, 'setError').mockImplementation(() => {});

      const { container } = render(<SudokuMessage />);

      fireEvent.click(container.getElementsByClassName('close')[0]);

      expect(spy).toHaveBeenCalledWith(null, dispatchSpy);
    });
  });
});