import type { FC } from 'react';
import clsx from 'clsx';
import type { ProductProps } from '@/types/product';
import { splitDescription } from '@utils/splitDescription';
import { Template01Copy } from './components/Template01Copy';
import { Template01Media } from './components/Template01Media';
import { Template01Meta } from './components/Template01Meta';
import { Template01Sku } from './components/Template01Sku';
import styles from './Template01.module.scss';
import { formatTemplate01PageNumber } from './utils/formatTemplate01PageNumber';
import type { PageProps } from '@/data/pages';

type Template01Props = PageProps & {
  className?: string;
  pageNumber: string;
  label: string;
};

export const Template01: FC<Template01Props> = ({
  id,
  title,
  sku,
  name,
  description,
  image,
  className,
  pageNumber,
  label,
}) => {
  // const page = id ? formatTemplate01PageNumber(id) : null;

  return (
    <article className={clsx(styles.root, className)}>
      <Template01Meta label={label} content={name} />
      <Template01Media src={image} alt={name} />
      <Template01Sku value={sku} />
      <Template01Copy title={title} description={description} />
      <p className={styles.pageNumber}>{pageNumber}</p>
    </article>
  );
};
