import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Details.module.scss';

type DetailsProps = {
  extraSrc?: string;
  detailSrc?: string;
  caption?: string;
  alt: string;
  className?: string;
};

export const Details: FC<DetailsProps> = ({
  extraSrc,
  detailSrc,
  caption,
  alt,
  className,
}) => (
  <div className={clsx(styles.details, className)}>
    {extraSrc ? (
      <div className={styles.foam}>
        <img src={extraSrc} alt={`${alt}, пена`} className={styles.foamImage} />
      </div>
    ) : null}
    {caption ? <p className={styles.caption}>{caption}</p> : null}
    {detailSrc ? (
      <div className={styles.face}>
        <img
          src={detailSrc}
          alt={`${alt}, нанесение`}
          className={styles.faceImage}
        />
      </div>
    ) : null}
  </div>
);
