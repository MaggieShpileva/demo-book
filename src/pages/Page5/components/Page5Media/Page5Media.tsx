import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page5Media.module.scss';

type Page5MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Page5Media: FC<Page5MediaProps> = ({ src, alt, className }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
