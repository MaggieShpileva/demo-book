import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Title.module.scss';

type TitleAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TitleSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'display'
  | 'displayLg'
  | 'displayXl'
  | 'display2xl';

type TitleProps = {
  variant?: 'regular' | 'medium' | 'bold';
  size?: TitleSize;
  uppercase?: boolean;
  children?: ReactNode;
  className?: string;
  as?: TitleAs;
};

export const Title: FC<TitleProps> = ({
  variant = 'regular',
  size = 'small',
  uppercase = true,
  children,
  className,
  as: Component = 'h2',
}) => {
  const titleClass = clsx(
    styles.title,
    styles[variant],
    styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
    uppercase && styles.uppercase,
    className
  );

  return <Component className={titleClass}>{children}</Component>;
};
