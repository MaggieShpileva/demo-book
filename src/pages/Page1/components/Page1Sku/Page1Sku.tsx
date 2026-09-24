import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page1Sku.module.scss';

type Page1SkuProps = {
  value: string;
  className?: string;
};

export const Page1Sku: FC<Page1SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
