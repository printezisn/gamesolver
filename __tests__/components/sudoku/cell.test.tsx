import { act, fireEvent, render } from '@testing-library/react';
import SudokuTableCell from '../../../components/sudoku/cell';
import * as sudokuReducer from '../../../reducers/sudoku/reducer';
import * as sudokuActions from '../../../reducers/sudoku/actions';
import { StateHandler } from '../../../reducers/sudoku/types';

const table = [
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

describe('<SudokuTableCell />', () => {
  const dispatchSpy = jest.fn();

  const renderComponent = (row: number, col: number) => {
    return render(<SudokuTableCell row={row} col={col} />);
  };

  const createState = (invalidCells: any, completed: boolean) => {
    const state = new StateHandler({
      initialized: true,
      initialTable: table,
      table,
      invalidCells,
      completed,
    }, false).getState();

    jest.spyOn(sudokuReducer, 'useSudoku').mockImplementation(() => state);
    jest.spyOn(sudokuReducer, 'useSudokuDispatch').mockImplementation(() => dispatchSpy);
  };

  it('does not render the number picker', () => {
    createState({}, false);

    const { container } = renderComponent(1, 2);

    expect(Array.from(container.querySelectorAll('.dropdown'))).toEqual([]);
  });

  it('does not make the input readonly', () => {
    createState({}, false);

    const { container } = renderComponent(1, 2);
    const el = container.querySelector('input[type="number"]') as HTMLInputElement;

    expect(el.readOnly).toBeFalsy();
    expect(el.classList.contains('locked')).toBeFalsy();
  });

  describe('when the cell has a value', () => {
    beforeEach(() => createState({}, false));

    it('sets the value', () => {
      const { container } = renderComponent(1, 1);
      const el = container.querySelector('input[type="number"]') as HTMLInputElement;

      expect(el.value).toEqual('8');
    });
  });

  describe('when the cell does not have a value', () => {
    beforeEach(() => createState({}, false));

    it('sets no value', () => {
      const { container } = renderComponent(1, 0);
      const el = container.querySelector('input[type="number"]') as HTMLInputElement;

      expect(el.value).toEqual('');
    });
  });

  describe('when the cell is locked', () => {
    it('makes the input readonly', () => {
      createState({}, false);
  
      const { container } = renderComponent(1, 1);
      const el = container.querySelector('input[type="number"]') as HTMLInputElement;
  
      expect(el.readOnly).toBeTruthy();
      expect(el.classList.contains('locked')).toBeTruthy();
    });
  });

  describe('when the input is focused', () => {
    beforeEach(() => createState({}, false));

    it('sets the focused class', () => {
      const { container } = renderComponent(1, 0);
      const el = container.querySelector('input[type="number"]') as HTMLInputElement;

      fireEvent.focus(el);

      expect(el.classList.contains('focused')).toBeTruthy();
    });

    it('renders the number picker', () => {
      const { container } = renderComponent(1, 0);
      const el = container.querySelector('input[type="number"]') as HTMLInputElement;

      fireEvent.focus(el);

      expect(Array.from(container.querySelectorAll('.dropdown'))).not.toEqual([]);
    });

    describe('when the cell is locked', () => {
      it('does not render the number picker', () => {
        const { container } = renderComponent(1, 1);
        const el = container.querySelector('input[type="number"]') as HTMLInputElement;

        fireEvent.focus(el);

        expect(Array.from(container.querySelectorAll('.dropdown'))).toEqual([]);
      });
    });

    describe('when the user clicks somewhere outside the cell', () => {
      it('removes the number picker', () => {
        const { container } = renderComponent(1, 0);
        const el = container.querySelector('input[type="number"]') as HTMLInputElement;

        fireEvent.focus(el);
        fireEvent.click(document);

        expect(Array.from(container.querySelectorAll('.dropdown'))).toEqual([]);
      });
    });

    describe('when the user clicks somewhere inside the cell', () => {
      it('does not remove the number picker', () => {
        const { container } = renderComponent(1, 0);
        const el = container.querySelector('input[type="number"]') as HTMLInputElement;

        fireEvent.focus(el);
        fireEvent.click(container.children[0]);

        expect(Array.from(container.querySelectorAll('.dropdown'))).not.toEqual([]);
      });
    });

    describe('when another cell is focused', () => {
      it('removes the number picker', () => {
        const { container } = renderComponent(1, 0);
        const el = container.querySelector('input[type="number"]') as HTMLInputElement;

        fireEvent.focus(el);
        act(() => {
          document.dispatchEvent(new CustomEvent('sudokuDropdownOpen'));
        });

        expect(Array.from(container.querySelectorAll('.dropdown'))).toEqual([]);
      });
    });
  });

  describe('when the input value is invalid', () => {
    beforeEach(() => createState({ '9': true }, false));

    it('sets the invalid class to the input', () => {
      const { container } = renderComponent(1, 0);
      const el = container.querySelector('input[type="number"]') as HTMLInputElement;

      expect(el.classList.contains('invalid')).toBeTruthy();
    });
  });

  describe('when the sudoku is completed', () => {
    beforeEach(() => createState({}, true));

    it('sets the success class to the input', () => {
      const { container } = renderComponent(1, 0);
      const el = container.querySelector('input[type="number"]') as HTMLInputElement;

      expect(el.classList.contains('success')).toBeTruthy();
    });
  });

  describe('when the input value is changed', () => {
    beforeEach(() => createState({}, false));

    it('dispatches an action to update the table', () => {
      const spy = jest.spyOn(sudokuActions, 'updateCell').mockImplementation(() => {});

      const { container } = renderComponent(1, 0);
      const el = container.querySelector('input[type="number"]') as HTMLInputElement;

      fireEvent.change(el, { target: { value: '8' } });

      expect(spy).toHaveBeenCalledWith(1, 0, '8', dispatchSpy);
    });
  });

  describe('when a number is selected in the picker', () => {
    beforeEach(() => createState({}, false));

    it('dispatches an action to update the table', () => {
      const spy = jest.spyOn(sudokuActions, 'updateCell').mockImplementation(() => {});

      const { container } = renderComponent(1, 0);
      const input = container.querySelector('input[type="number"]') as HTMLInputElement;

      fireEvent.focus(input);

      const numLink = Array.from(container.querySelectorAll('.dropdown li a'))[3];

      fireEvent.click(numLink);

      expect(spy).toHaveBeenCalledWith(1, 0, '4', dispatchSpy);
    });
  });
});