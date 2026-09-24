import type { ButtonHTMLAttributes, CSSProperties, FC } from 'react';
import clsx from 'clsx';
import styles from './Point.module.scss';

type PointProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  style?: CSSProperties;
  className?: string;
};

export const Point: FC<PointProps> = ({ className, style, ...props }) => (
  <button
    type="button"
    className={clsx(styles.point, className)}
    style={style}
    {...props}
  />
);
