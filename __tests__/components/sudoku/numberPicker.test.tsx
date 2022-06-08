import { fireEvent, render } from '@testing-library/react';
import NumberPicker from '../../../components/sudoku/numberPicker';

describe('<NumberPicker />', () => {
  let selectedNumber: number;

  const renderComponent = (right: boolean, onSelect: (num: number) => void) => {
    return render(<NumberPicker right={right} onSelect={onSelect} />);
  };

  const onSelect = (num: number) => {
    selectedNumber = num;
  };

  describe('when the selected orientation is right', () => {
    it('sets a right orientation to the component', () => {
      const { container } = renderComponent(true, onSelect);
      const el = container.children[0];

      expect(el.classList.contains('right')).toBeTruthy();
    });
  });

  describe('when the selected orientation is not right', () => {
    it('does not set a right orientation to the component', () => {
      const { container } = renderComponent(false, onSelect);
      const el = container.children[0];

      expect(el.classList.contains('right')).toBeFalsy();
    });
  });

  it('fires the onSelect event when a number is selected', () => {
    const { container } = renderComponent(false, onSelect);
    const el = container.children[0];
    const numLink = Array.from(el.querySelectorAll('li a'))[2];

    fireEvent.click(numLink);

    expect(selectedNumber).toEqual(3);
  });
});