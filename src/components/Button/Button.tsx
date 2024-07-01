import styles from './Button.module.css';
import { FC } from 'react';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

// МОЖНО ВОТ ТАК

// export const ButtonAlt : FC<ButtonProps> = ({ className, children, ...props }) => {
//     return (
//         <button className={cn('button accent', className)} {...props}>
//           {children}
//         </button>
//       );
// };

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(styles['button'], styles['accent'], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
