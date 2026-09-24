import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page4Sku.module.scss';

type Page4SkuProps = {
  value: string;
  className?: string;
};

export const Page4Sku: FC<Page4SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
