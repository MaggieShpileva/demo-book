import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page8Media.module.scss';

type Page8MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Page8Media: FC<Page8MediaProps> = ({ src, alt, className }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
