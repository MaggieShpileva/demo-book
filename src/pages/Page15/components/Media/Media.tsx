import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Media.module.scss';

type MediaProps = {
  src?: string;
  startLabel?: string;
  endLabel?: string;
  alt: string;
  className?: string;
};

export const Media: FC<MediaProps> = ({
  src,
  startLabel,
  endLabel,
  alt,
  className,
}) => (
  <div className={clsx(styles.media, className)}>
    <div className={styles.frame}>
      {src ? <img src={src} alt={alt} className={styles.image} /> : null}
    </div>
    {startLabel ? (
      <p className={styles.startLabel}>
        <span className={styles.labelText}>{startLabel}</span>
      </p>
    ) : null}
    {endLabel ? (
      <p className={styles.endLabel}>
        <span className={styles.labelText}>{endLabel}</span>
      </p>
    ) : null}
  </div>
);
