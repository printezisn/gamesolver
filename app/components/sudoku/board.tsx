import styles from '../../styles/sudoku/board.module.css';

import { FC } from 'react';
import SudokuTableCell from './cell';

interface Props {
  row: number,
  col: number
}

const SudokuTableBoard: FC<Props> = ({ row, col }) => {
  const cells = [];

  for (let i = row * 3; i < (row + 1) * 3; i++) {
    for (let j = col * 3; j < (col + 1) * 3; j++) {
      cells.push(<SudokuTableCell row={i} col={j} key={`${i}-${j}`} />);
    }
  }

  return <div className={styles.board}>{cells}</div>;
};

export default SudokuTableBoard;