import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page6Media.module.scss';

type Page6MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Page6Media: FC<Page6MediaProps> = ({ src, alt, className }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
