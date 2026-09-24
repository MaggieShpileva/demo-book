import type { FC } from 'react';
import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Page5Copy } from './components/Page5Copy';
import { Page5Media } from './components/Page5Media';
import { Page5Meta } from './components/Page5Meta';
import { Page5Sku } from './components/Page5Sku';
import styles from './Page5.module.scss';

export const Page5: FC = () => {
  const product = PAGES[4];

  if (!product) {
    return null;
  }

  return (
    <PageCornerEffect>
      <article className={styles.page5}>
        <Page5Meta label="№ 5" content={product.name} />
        <Page5Media src={product.image} alt={product.name} />
        <Page5Sku value={product.sku} />
        <Page5Copy title={product.title} description={product.description} />
        <p className={styles.pageNumber}>05</p>
      </article>
    </PageCornerEffect>
  );
};
