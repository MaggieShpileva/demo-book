import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Sku.module.scss';

type SkuProps = {
  value: string;
  className?: string;
};

export const Sku: FC<SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.sku, className)}>{value}</p>
);
