import { FC } from 'react';
import { generateSudoku, solveSudoku } from '../../reducers/sudoku/actions';
import { useSudokuDispatch } from '../../reducers/sudoku/reducer';

const SudokuMenu: FC = () => {
  const dispatch = useSudokuDispatch();

  const handleGenerate = () => generateSudoku(dispatch);
  const handleSolve = () => solveSudoku(dispatch);

  return (
    <div className="button-group">
      <button type="button" className="button" onClick={handleSolve}>Solve</button>
      <button type="button" className="button primary" onClick={handleGenerate}>New sudoku</button>
    </div>
  );
};

export default SudokuMenu;