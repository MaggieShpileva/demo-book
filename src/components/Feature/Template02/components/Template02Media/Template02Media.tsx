import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template02Media.module.scss';

type Template02MediaProps = {
  imageSrc?: string;
  imageAlt: string;
  className?: string;
};

export const Template02Media: FC<Template02MediaProps> = ({
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
