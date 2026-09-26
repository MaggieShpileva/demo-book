import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Media.module.scss';

type MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Media: FC<MediaProps> = ({ src, alt, className }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={clsx(styles.media, className)}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};
