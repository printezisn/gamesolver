import classNames from 'classnames';
import { FC, useState } from 'react';
import { Difficulty } from '../../lib/sudoku';
import { generateEmptySudoku, generateSudoku, solveSudoku } from '../../reducers/sudoku/actions';
import { useSudoku, useSudokuDispatch } from '../../reducers/sudoku/reducer';

const SudokuMenu: FC = () => {
  const [showInitialMenu, setShowInitialMenu] = useState(true);

  const state = useSudoku();
  const dispatch = useSudokuDispatch();

  const handleGenerate = (difficulty: Difficulty) => {
    generateSudoku(difficulty, dispatch);

    setShowInitialMenu(true);
  };

  const handleGenerateEmpty = () => {
    generateEmptySudoku(dispatch);

    setShowInitialMenu(true);
  };
  
  const handleSolve = () => solveSudoku(state, dispatch);

  return (
    <div className="button-group">
      {showInitialMenu && (
        <>
          <button
            type="button"
            className={classNames({ button: true, disabled: state.loading })}
            disabled={state.loading}
            onClick={handleSolve}
          >
            Solve
          </button>
          <button
            type="button"
            className={classNames({ button: true, primary: true, disabled: state.loading })}
            disabled={state.loading}
            onClick={() => setShowInitialMenu(false)}
          >
            New sudoku
          </button>
        </>
      )}
      {!showInitialMenu && (
        <>
          <button
            type="button"
            className={classNames({ button: true, success: true, disabled: state.loading })}
            disabled={state.loading}
            onClick={() => handleGenerate(Difficulty.Easy)}
          >
            Easy
          </button>
          <button
            type="button"
            className={classNames({ button: true, warning: true, disabled: state.loading })}
            disabled={state.loading}
            onClick={() => handleGenerate(Difficulty.Normal)}
          >
            Normal
          </button>
          <button
            type="button"
            className={classNames({ button: true, error: true, disabled: state.loading })}
            disabled={state.loading}
            onClick={() => handleGenerate(Difficulty.Hard)}
          >
            Hard
          </button>
          <button
            type="button"
            className={classNames({ button: true, primary: true, disabled: state.loading })}
            disabled={state.loading}
            onClick={() => handleGenerateEmpty()}
          >
            Empty
          </button>
          <button
            type="button"
            className={classNames({ button: true, disabled: state.loading })}
            disabled={state.loading}
            onClick={() => setShowInitialMenu(true)}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default SudokuMenu;