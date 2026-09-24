import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page7Sku.module.scss';

type Page7SkuProps = {
  value: string;
  className?: string;
};

export const Page7Sku: FC<Page7SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
