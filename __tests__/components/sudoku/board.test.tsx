import { render } from '@testing-library/react';
import SudokuTableBoard from '../../../components/sudoku/board';

describe('<SudokuTableBoard />', () => {
  beforeEach(() => {
    render(<SudokuTableBoard row={2} col={1} />);
  });

  it('renders all cells', () => {
    const { container } = render(<SudokuTableBoard row={2} col={1} />);

    expect(container.querySelectorAll('input[type="number"]').length).toEqual(9);
  });
});