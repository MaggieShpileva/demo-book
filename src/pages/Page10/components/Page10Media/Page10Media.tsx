import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page10Media.module.scss';

type Page10MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Page10Media: FC<Page10MediaProps> = ({ src, alt, className }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
