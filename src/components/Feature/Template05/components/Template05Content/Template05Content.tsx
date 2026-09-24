import type { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@components/UI';
import type { ProductAttribute } from '@/types/product';
import styles from './Template05Content.module.scss';

type Template05ContentProps = {
  columns: ProductAttribute[];
  className?: string;
};

export const Template05Content: FC<Template05ContentProps> = ({
  columns,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    {columns.map((column) => (
      <div key={column.key} className={styles.column}>
        <h2 className={styles.heading}>{column.key}</h2>
        <Typography size="body">{column.value}</Typography>
      </div>
    ))}
  </div>
);
