import styles from './Headling.module.css';
import cn from 'classnames';
import { HeadlingProps } from './Headling.props';

const Headling = ({ children, className, ...props }: HeadlingProps) => {
  return (
    <h1 className={cn(styles['headling'], className)} {...props}>
      {children}
    </h1>
  );
};

export default Headling;
