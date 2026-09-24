import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page2Media.module.scss';

type Page2MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Page2Media: FC<Page2MediaProps> = ({ src, alt, className }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
