import styles from '../../styles/sudoku/table.module.css';

import { FC, useEffect } from 'react';
import SudokuTableBoard from './board';
import { generateSudoku } from '../../reducers/sudoku/actions';
import { useSudokuDispatch } from '../../reducers/sudoku/reducer';

const SudokuTable: FC = () => {
  const dispatch = useSudokuDispatch();

  useEffect(() => {
    generateSudoku(dispatch);
  }, [dispatch]);

  const boards = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boards.push(<SudokuTableBoard row={i} col={j} key={`${i}-${j}`} />);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        {boards}
      </div>
    </div>
  );
};

export default SudokuTable;