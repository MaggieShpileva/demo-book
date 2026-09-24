import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page9Sku.module.scss';

type Page9SkuProps = {
  value: string;
  className?: string;
};

export const Page9Sku: FC<Page9SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
