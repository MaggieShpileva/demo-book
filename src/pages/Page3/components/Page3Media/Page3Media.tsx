import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page3Media.module.scss';

type Page3MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Page3Media: FC<Page3MediaProps> = ({ src, alt, className }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
