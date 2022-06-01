import styles from '../../styles/sudoku/cell.module.css';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSudoku, useSudokuDispatch } from '../../reducers/sudoku/reducer';
import { updateCell } from '../../reducers/sudoku/actions';
import classNames from 'classnames';
import NumberPicker from './number-picker';

interface Props {
  row: number,
  col: number
}

const SudokuTableCell: FC<Props> = ({ row, col }) => {
  const { initialTable, table, invalidCells, completed } = useSudoku();
  const dispatch = useSudokuDispatch();

  const [showNumberPicker, setShowNumberPicker] = useState(false);
  const focusedRef = useRef(false);

  const handleLostFocus = () => {
    if (!focusedRef.current) {
      setShowNumberPicker(false);
    }

    focusedRef.current = false;
  };

  const onNumberSelect = useCallback(
    (num: number) => {
      updateCell(row, col, num.toString(), dispatch);

      focusedRef.current = false;
      handleLostFocus();
    },
    [row, col, dispatch],
  );

  useEffect(() => {
    document.addEventListener('click', handleLostFocus);

    return () => document.removeEventListener('click', handleLostFocus);
  }, []);
  
  const value = table[row][col] ? table[row][col] as number : '';
  const locked = Boolean(initialTable[row][col]);

  return (
    <div className={styles.cell} onClick={() => focusedRef.current = true}>
      <input
        type="number"
        aria-label={`Cell ${row}-${col}`}
        className={classNames({
          [styles.input]: true,
          [styles.locked]: locked,
          [styles.invalid]: Boolean(invalidCells[row * 9 + col]),
          [styles.success]: completed,
        })}
        readOnly={locked}
        value={value}
        onChange={(e) => updateCell(row, col, e.target.value, dispatch)}
        onFocus={() => setShowNumberPicker(true)}
      />
      {!locked && <NumberPicker show={showNumberPicker} onSelect={onNumberSelect} right={col >= 6} />}
    </div>
  );
};

export default SudokuTableCell;