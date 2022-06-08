import styles from '../../styles/sudoku/number-picker.module.css';

import { FC } from 'react';
import classNames from 'classnames';

interface Props {
  right: boolean,
  onSelect: (num: number) => void
}

const NumberPicker: FC<Props> = ({ right, onSelect }) => {
  const numbers = [];

  for (let i = 1; i <= 9; i++) {
    numbers.push(
      <li key={i}>
        <a href="#" onClick={() => onSelect(i)}>{i}</a>
      </li>,
    );
  }

  return (
    <div
      className={classNames({ [styles.dropdown]: true, [styles.right]: right })}
    >
      <ul>{numbers}</ul>
    </div>
  );
};

export default NumberPicker;