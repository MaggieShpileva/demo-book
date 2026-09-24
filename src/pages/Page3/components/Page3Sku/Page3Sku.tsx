import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page3Sku.module.scss';

type Page3SkuProps = {
  value: string;
  className?: string;
};

export const Page3Sku: FC<Page3SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
