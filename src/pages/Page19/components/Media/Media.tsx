import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Media.module.scss';

type MediaProps = {
  src?: string;
  caption?: string;
  alt: string;
  className?: string;
};

export const Media: FC<MediaProps> = ({
  src,
  caption,
  alt,
  className,
}) => (
  <div className={clsx(styles.media, className)}>
    <div className={styles.frame}>
      {src ? <img src={src} alt={alt} className={styles.image} /> : null}
    </div>
    {caption ? <p className={styles.caption}>{caption}</p> : null}
  </div>
);
