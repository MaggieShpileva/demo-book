import type { FC } from 'react';
import clsx from 'clsx';
import { ARTICLE_LABEL, HEADER_TITLE } from '@/constants/catalog';
import styles from './ProductHeader.module.scss';

type ProductHeaderProps = {
  itemId: string;
  pageNumber?: string;
  title?: string;
  articleLabel?: string;
  className?: string;
};

export const ProductHeader: FC<ProductHeaderProps> = ({
  itemId,
  pageNumber = '0001',
  title = HEADER_TITLE,
  articleLabel = ARTICLE_LABEL,
  className,
}) => (
  <header className={clsx(styles.root, className)}>
    <p className={styles.title}>{title}</p>
    <div className={styles.article}>
      <p className={styles.label}>{articleLabel}</p>
      <p className={styles.itemId}>{itemId}</p>
    </div>
    <p className={styles.pageNumber}>{pageNumber}</p>
  </header>
);
