import styles from '../../styles/sudoku/cell.module.css';

import { FC } from 'react';
import { useSudoku, useSudokuDispatch } from '../../reducers/sudoku/reducer';
import { updateCell } from '../../reducers/sudoku/actions';
import classNames from 'classnames';

interface Props {
  row: number,
  col: number
}

const SudokuTableCell: FC<Props> = ({ row, col }) => {
  const { initialTable, table } = useSudoku();
  const dispatch = useSudokuDispatch();
  
  const value = table[row][col] ? table[row][col] as number : '';
  const locked = Boolean(initialTable[row][col]);

  return (
    <div className={styles.cell}>
      <input
        type="text"
        className={classNames(styles.input, { [styles.locked]: locked })}
        readOnly={locked}
        value={value}
        onChange={(e) => updateCell(row, col, e.target.value, dispatch)}
      />
    </div>
  );
};

export default SudokuTableCell;