import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template09Media.module.scss';

type Template09MediaProps = {
  imageSrc?: string;
  imageAlt: string;
  className?: string;
};

export const Template09Media: FC<Template09MediaProps> = ({
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
