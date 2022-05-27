import { FC } from 'react';

const SudokuMenu: FC = () => (
  <div className="button-group">
    <button type="button" className="button primary">Play new sudoku</button>
    <button type="button" className="button">Solve existing</button>
  </div>
);

export default SudokuMenu;