import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page8Sku.module.scss';

type Page8SkuProps = {
  value: string;
  className?: string;
};

export const Page8Sku: FC<Page8SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
