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
  
  const value = table[row][col] ? table[row][col] as number : '';
  const locked = Boolean(initialTable[row][col]);

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
        })}
        readOnly={locked}
        value={value}
        onChange={(e) => updateCell(row, col, e.target.value, dispatch)}
        onFocus={setFocus}
      />
      {!locked && <NumberPicker show={showNumberPicker} onSelect={onNumberSelect} right={col >= 6} />}
    </div>
  );
};

export default SudokuTableCell;