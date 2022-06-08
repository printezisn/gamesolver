import * as sudokuReducer from '../../../reducers/sudoku/reducer';
import * as sudokuActions from '../../../reducers/sudoku/actions';
import { getEmpty2DArray } from '../../../lib/utils';
import SudokuTable from '../../../components/sudoku/table';
import { render } from '@testing-library/react';
import { State } from '../../../reducers/sudoku/types';

describe('<SudokuTable />', () => {
  const dispatchSpy = jest.fn();

  const createState = (initialized: boolean) => {
    const emptyTable = getEmpty2DArray(9, 9);
    const state: State = {
      initialized,
      table: emptyTable,
      initialTable: emptyTable,
      invalidCells: {},
      completed: false,
      loadSolution: false,
      solution: emptyTable,
    };

    jest.spyOn(sudokuReducer, 'useSudoku').mockImplementation(() => state);
    jest.spyOn(sudokuReducer, 'useSudokuDispatch').mockImplementation(() => dispatchSpy);

    return state;
  };

  it('renders all cells', () => {
    createState(true);

    const { container } = render(<SudokuTable />);
    
    expect(container.querySelectorAll('input[type="number"]').length).toEqual(81);
  });

  it('initializes the sudoku if it is not already initialized', () => {
    const spy = jest.spyOn(sudokuActions, 'initializeSudoku').mockImplementation(() => {});

    createState(false);
    render(<SudokuTable />);

    expect(spy).toHaveBeenCalledWith(dispatchSpy);
  });

  it('stores the sudoku if it is already initialized', () => {
    const spy = jest.spyOn(sudokuActions, 'storeSudoku').mockImplementation(() => {});
    const state = createState(true);

    render(<SudokuTable />);

    expect(spy).toHaveBeenCalledWith(state);
  });
});