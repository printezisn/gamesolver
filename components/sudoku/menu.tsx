import { FC, useState } from 'react';
import { Difficulty } from '../../lib/sudoku';
import { generateEmptySudoku, generateSudoku, solveSudoku } from '../../reducers/sudoku/actions';
import { useSudokuDispatch } from '../../reducers/sudoku/reducer';

const SudokuMenu: FC = () => {
  const [showInitialMenu, setShowInitialMenu] = useState(true);

  const dispatch = useSudokuDispatch();

  const handleGenerate = (difficulty: Difficulty) => {
    generateSudoku(difficulty, dispatch);

    setShowInitialMenu(true);
  };

  const handleGenerateEmpty = () => {
    generateEmptySudoku(dispatch);

    setShowInitialMenu(true);
  };
  
  const handleSolve = () => solveSudoku(dispatch);

  return (
    <div className="button-group">
      {showInitialMenu && (
        <>
          <button type="button" className="button" onClick={handleSolve}>Solve</button>
          <button type="button" className="button primary" onClick={() => setShowInitialMenu(false)}>New sudoku</button>
        </>
      )}
      {!showInitialMenu && (
        <>
          <button type="button" className="button success" onClick={() => handleGenerate(Difficulty.Easy)}>Easy</button>
          <button type="button" className="button warning" onClick={() => handleGenerate(Difficulty.Normal)}>Normal</button>
          <button type="button" className="button error" onClick={() => handleGenerate(Difficulty.Hard)}>Hard</button>
          <button type="button" className="button primary" onClick={() => handleGenerateEmpty()}>Empty</button>
          <button type="button" className="button" onClick={() => setShowInitialMenu(true)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default SudokuMenu;