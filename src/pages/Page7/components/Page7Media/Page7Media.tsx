import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page7Media.module.scss';

type Page7MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Page7Media: FC<Page7MediaProps> = ({ src, alt, className }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
