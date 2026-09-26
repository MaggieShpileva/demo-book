import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Media.module.scss';

type MediaProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const Media: FC<MediaProps> = ({ src, alt, className }) => (
  <div className={clsx(styles.media, className)}>
    {src ? <img src={src} alt={alt} className={styles.product} /> : null}
    <div className={styles.fade} aria-hidden />
  </div>
);
