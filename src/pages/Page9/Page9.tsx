import type { FC } from 'react';
import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Page9Copy } from './components/Page9Copy';
import { Page9Media } from './components/Page9Media';
import { Page9Meta } from './components/Page9Meta';
import { Page9Sku } from './components/Page9Sku';
import styles from './Page9.module.scss';

export const Page9: FC = () => {
  const product = PAGES[8];

  if (!product) {
    return null;
  }

  return (
    <PageCornerEffect>
      <article className={styles.page9}>
        <Page9Meta label="№ 9" content={product.name} />
        <Page9Media src={product.image} alt={product.name} />
        <Page9Sku value={product.sku} />
        <Page9Copy title={product.title} description={product.description} />
        <p className={styles.pageNumber}>09</p>
      </article>
    </PageCornerEffect>
  );
};
