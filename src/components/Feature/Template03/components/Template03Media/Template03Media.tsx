import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template03Media.module.scss';

type Template03MediaProps = {
  imageSrc?: string;
  imageAlt: string;
  className?: string;
};

export const Template03Media: FC<Template03MediaProps> = ({
  imageSrc,
  imageAlt,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    {imageSrc ? (
      <img className={styles.image} src={imageSrc} alt={imageAlt} />
    ) : null}
  </div>
);
