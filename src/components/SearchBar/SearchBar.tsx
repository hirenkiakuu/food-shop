import { forwardRef } from 'react';
import styles from './SearchBar.module.css';
import { SearchBarProps } from './SearchBar.props';
import cn from 'classnames';

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function Input(
  { isValid = true, className, ...props },
  ref
) {
  return (
    <div className={styles['input-wrapper']}>
      <input
        ref={ref}
        className={cn(styles['input'], className, {
          [styles['invalid']]: !isValid,
        })}
        {...props}
      />
      <img className={styles['input-icon']} src="/lens.svg" alt="" />
    </div>
  );
});

export default SearchBar;
