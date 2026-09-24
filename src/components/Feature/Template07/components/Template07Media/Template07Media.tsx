import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template07Media.module.scss';

type Template07MediaProps = {
  bottleSrc?: string;
  detailSrc?: string;
  imageAlt: string;
  className?: string;
};

export const Template07Media: FC<Template07MediaProps> = ({
  bottleSrc,
  detailSrc,
  imageAlt,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    <div className={styles.detailFrame} />
    {detailSrc ? (
      <div className={styles.detailWrap}>
        <div className={styles.detailRotate}>
          <img
            className={styles.detailImage}
            src={detailSrc}
            alt={`${imageAlt} detail`}
          />
        </div>
      </div>
    ) : null}
    <div className={styles.bottleFrame} />
    {bottleSrc ? (
      <img className={styles.bottleImage} src={bottleSrc} alt={imageAlt} />
    ) : null}
  </div>
);
