import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Media.module.scss';

type MediaProps = {
  src?: string;
  extraSrc?: string;
  alt: string;
  className?: string;
};

export const Media: FC<MediaProps> = ({
  src,
  extraSrc,
  alt,
  className,
}) => (
  <div className={clsx(styles.media, className)}>
    {extraSrc ? (
      <div className={styles.product}>
        <img
          src={extraSrc}
          alt={`${alt}, тушь`}
          className={styles.productImage}
        />
      </div>
    ) : null}
    {src ? (
      <div className={styles.portrait}>
        <img src={src} alt={alt} className={styles.portraitImage} />
      </div>
    ) : null}
  </div>
);
