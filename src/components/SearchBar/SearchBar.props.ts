import { InputHTMLAttributes } from 'react';

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
}
