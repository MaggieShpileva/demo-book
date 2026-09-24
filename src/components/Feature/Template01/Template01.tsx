import type { FC } from 'react';
import clsx from 'clsx';
import type { PageProps } from '@/data/pages';
import { Template01Copy } from './components/Template01Copy';
import { Template01Media } from './components/Template01Media';
import { Template01Meta } from './components/Template01Meta';
import { Template01Sku } from './components/Template01Sku';
import styles from './Template01.module.scss';

export type Template01Props = PageProps & {
  className?: string;
  pageNumber: string;
  label: string;
};

export const Template01: FC<Template01Props> = ({
  title,
  sku,
  name,
  description,
  image,
  className,
  pageNumber,
  label,
}) => (
  <article className={clsx(styles.root, className)}>
    <Template01Meta label={label} content={name} />
    <Template01Media src={image} alt={name} />
    <Template01Sku value={sku} />
    <Template01Copy title={title} description={description} />
    <p className={styles.pageNumber}>{pageNumber}</p>
  </article>
);
