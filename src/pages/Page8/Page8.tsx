import type { FC } from 'react';
import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Page8Copy } from './components/Page8Copy';
import { Page8Media } from './components/Page8Media';
import { Page8Meta } from './components/Page8Meta';
import { Page8Sku } from './components/Page8Sku';
import styles from './Page8.module.scss';

export const Page8: FC = () => {
  const product = PAGES[7];

  if (!product) {
    return null;
  }

  return (
    <PageCornerEffect>
      <article className={styles.page8}>
        <Page8Meta label="№ 8" content={product.name} />
        <Page8Media src={product.image} alt={product.name} />
        <Page8Sku value={product.sku} />
        <Page8Copy title={product.title} description={product.description} />
        <p className={styles.pageNumber}>08</p>
      </article>
    </PageCornerEffect>
  );
};
