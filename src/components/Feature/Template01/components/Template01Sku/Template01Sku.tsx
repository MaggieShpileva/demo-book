import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template01Sku.module.scss';

type Template01SkuProps = {
  value: string;
  className?: string;
};

export const Template01Sku: FC<Template01SkuProps> = ({ value, className }) => (
  <p className={clsx(styles.root, className)}>{value}</p>
);
