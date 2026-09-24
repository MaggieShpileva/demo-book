import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template05Media.module.scss';

type Template05MediaProps = {
  imageSrc?: string;
  imageAlt: string;
  className?: string;
};

export const Template05Media: FC<Template05MediaProps> = ({
  imageSrc,
  imageAlt,
  className,
}) => (
  <section className={clsx(styles.root, className)}>
    {imageSrc ? (
      <img className={styles.image} src={imageSrc} alt={imageAlt} />
    ) : null}
  </section>
);
