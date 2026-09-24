import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template01Media.module.scss';

type Template01MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Template01Media: FC<Template01MediaProps> = ({
  src,
  alt,
  className,
}) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
