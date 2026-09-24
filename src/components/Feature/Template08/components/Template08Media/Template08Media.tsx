import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template08Media.module.scss';

type Template08MediaProps = {
  imageSrc?: string;
  imageAlt: string;
  className?: string;
};

export const Template08Media: FC<Template08MediaProps> = ({
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
