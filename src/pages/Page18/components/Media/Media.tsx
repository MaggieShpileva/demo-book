import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Media.module.scss';

type MediaProps = {
  src?: string;
  extraSrc?: string;
  detailSrc?: string;
  alt: string;
  className?: string;
};

export const Media: FC<MediaProps> = ({
  src,
  extraSrc,
  detailSrc,
  alt,
  className,
}) => (
  <div className={clsx(styles.media, className)}>
    <div className={styles.portrait}>
      {src ? <img src={src} alt="" className={styles.portraitImage} /> : null}
      {extraSrc ? (
        <img src={extraSrc} alt={alt} className={styles.model} />
      ) : null}
      <div className={styles.fade} aria-hidden />
    </div>
    {detailSrc ? (
      <div className={styles.product}>
        <img
          src={detailSrc}
          alt={`${alt}, румяна`}
          className={styles.productImage}
        />
      </div>
    ) : null}
  </div>
);
