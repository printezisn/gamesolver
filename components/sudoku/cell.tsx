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

  const value = table[row][col] ? table[row][col] as number : '';
  const locked = Boolean(initialTable[row][col]);

  const [showNumberPicker, setShowNumberPicker] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (!wrapperRef.current || !target || !wrapperRef.current.contains(target)) {
      setShowNumberPicker(false);
    }
  };

  const handleSudokuDropdownOpen = () => {
    setShowNumberPicker(false);
  };

  const setFocus = () => {
    if (locked) {
      return;
    }

    document.dispatchEvent(new CustomEvent('sudokuDropdownOpen'));

    setShowNumberPicker(true);
  };

  const onNumberSelect = useCallback(
    (num: number) => {
      updateCell(row, col, num.toString(), dispatch);

      setShowNumberPicker(false);
    },
    [row, col, dispatch],
  );

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('sudokuDropdownOpen', handleSudokuDropdownOpen);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('sudokuDropdownOpen', handleSudokuDropdownOpen);
    };
  }, []);

  return (
    <div className={styles.cell} ref={wrapperRef}>
      <input
        type="number"
        aria-label={`Cell ${row}-${col}`}
        className={classNames({
          [styles.input]: true,
          [styles.locked]: locked,
          [styles.invalid]: Boolean(invalidCells[row * 9 + col]),
          [styles.success]: completed,
          [styles.focused]: showNumberPicker,
        })}
        readOnly={locked}
        value={value}
        onChange={(e) => updateCell(row, col, e.target.value, dispatch)}
        onFocus={setFocus}
      />
      {!locked && showNumberPicker && <NumberPicker onSelect={onNumberSelect} right={col >= 6} />}
    </div>
  );
};

export default SudokuTableCell;