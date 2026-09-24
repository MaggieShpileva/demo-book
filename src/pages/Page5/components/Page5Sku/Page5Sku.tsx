import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page5Sku.module.scss';

type Page5SkuProps = {
  value: string;
  className?: string;
};

export const Page5Sku: FC<Page5SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
