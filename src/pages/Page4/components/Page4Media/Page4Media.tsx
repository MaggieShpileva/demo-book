import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page4Media.module.scss';

type Page4MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Page4Media: FC<Page4MediaProps> = ({ src, alt, className }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
