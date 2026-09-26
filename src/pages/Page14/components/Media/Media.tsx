import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Media.module.scss';

type MediaProps = {
  src?: string;
  extraSrc?: string;
  detailSrc?: string;
  label?: string;
  alt: string;
  className?: string;
};

export const Media: FC<MediaProps> = ({
  src,
  extraSrc,
  detailSrc,
  label,
  alt,
  className,
}) => (
  <div className={clsx(styles.media, className)}>
    {src ? <img src={src} alt={alt} className={styles.camera} /> : null}
    {extraSrc ? (
      <div className={styles.compact}>
        <img
          src={extraSrc}
          alt={`${alt}, пудра`}
          className={styles.compactImage}
        />
      </div>
    ) : null}
    {detailSrc ? (
      <div className={styles.strap}>
        <img
          src={detailSrc}
          alt={`${alt}, ремешок`}
          className={styles.strapImage}
        />
      </div>
    ) : null}
    {label ? (
      <p className={styles.label}>
        <span className={styles.labelText}>{label}</span>
      </p>
    ) : null}
  </div>
);
