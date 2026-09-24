import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page2Sku.module.scss';

type Page2SkuProps = {
  value: string;
  className?: string;
};

export const Page2Sku: FC<Page2SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
