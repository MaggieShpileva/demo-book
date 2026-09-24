import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template10Media.module.scss';

type Template10MediaProps = {
  imageSrc?: string;
  imageAlt: string;
  className?: string;
};

export const Template10Media: FC<Template10MediaProps> = ({
  imageSrc,
  imageAlt,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    <div className={styles.panel} aria-hidden />
    {imageSrc ? (
      <img className={styles.image} src={imageSrc} alt={imageAlt} />
    ) : null}
  </div>
);
