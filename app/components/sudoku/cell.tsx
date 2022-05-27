import styles from '../../styles/sudoku/cell.module.css';

import { FC } from 'react';

interface Props {
  row: number,
  col: number
}

const SudokuTableCell: FC<Props> = ({ row, col }) => {
  return (
    <div className={styles.cell}>
      <input type="text" className={styles.input} />
    </div>
  );
};

export default SudokuTableCell;