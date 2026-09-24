import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template06Media.module.scss';

type Template06MediaProps = {
  imageSrc?: string;
  imageAlt: string;
  className?: string;
};

export const Template06Media: FC<Template06MediaProps> = ({
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
