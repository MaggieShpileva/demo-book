import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page1Media.module.scss';

type Page1MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Page1Media: FC<Page1MediaProps> = ({ src, alt, className }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
