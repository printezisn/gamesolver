import styles from '../../styles/sudoku/message.module.css';

import { FC } from 'react';
import { useSudoku, useSudokuDispatch } from '../../reducers/sudoku/reducer';
import { setError } from '../../reducers/sudoku/actions';

const SudokuMessage: FC = () => {
  const { error } = useSudoku();
  const dispatch = useSudokuDispatch();

  const handleClose = () => {
    setError(null, dispatch);
  };

  if (!error) {
    return <></>;
  }

  return (
    <p className={styles.error}>
      {error}
      <button type="button" className={styles.close} onClick={handleClose}></button>
    </p>
  );
};

export default SudokuMessage;