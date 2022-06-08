import { fireEvent, render } from '@testing-library/react';
import SudokuMenu from '../../../components/sudoku/menu';

describe('<SudokuMenu />', () => {
  describe('when the initial menu is shown', () => {
    it('renders the initial menu buttons', () => {
      const { getByText, queryByText } = render(<SudokuMenu />);

      getByText('Solve');
      getByText('New sudoku');
      expect(queryByText('Easy')).toBeNull();
      expect(queryByText('Normal')).toBeNull();
      expect(queryByText('Hard')).toBeNull();
      expect(queryByText('Empty')).toBeNull();
      expect(queryByText('Cancel')).toBeNull();
    });
  });

  describe('when the new sudoku menu is shown', () => {
    it('renders the new sudoku menu buttons', () => {
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
  });
});