import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page6Sku.module.scss';

type Page6SkuProps = {
  value: string;
  className?: string;
};

export const Page6Sku: FC<Page6SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
