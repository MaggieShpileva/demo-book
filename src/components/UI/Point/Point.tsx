import type { ButtonHTMLAttributes, CSSProperties, FC } from 'react';
import clsx from 'clsx';
import styles from './Point.module.scss';

type PointProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  style?: CSSProperties;
  className?: string;
};

export const Point: FC<PointProps> = ({
  className,
  style,
  onPointerDown,
  onClick,
  ...props
}) => (
  <button
    type="button"
    className={clsx(styles.point, className)}
    style={style}
    onPointerDown={(event) => {
      event.stopPropagation();
      onPointerDown?.(event);
    }}
    onClick={(event) => {
      event.stopPropagation();
      onClick?.(event);
    }}
    {...props}
  />
);
