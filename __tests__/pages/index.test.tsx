import { render } from '@testing-library/react';
import Home from '../../pages';

describe('<Home />', () => {
  it('renders the sudoku page', () => {
    const { container } = render(<Home />);

    expect(container.querySelectorAll('input[type="number"]').length).toEqual(81);
  });
});