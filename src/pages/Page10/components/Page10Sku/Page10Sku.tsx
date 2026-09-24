import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page10Sku.module.scss';

type Page10SkuProps = {
  value: string;
  className?: string;
};

export const Page10Sku: FC<Page10SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
