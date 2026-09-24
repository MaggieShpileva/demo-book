import type { FC } from 'react';
import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Page6Copy } from './components/Page6Copy';
import { Page6Media } from './components/Page6Media';
import { Page6Meta } from './components/Page6Meta';
import { Page6Sku } from './components/Page6Sku';
import styles from './Page6.module.scss';

export const Page6: FC = () => {
  const product = PAGES[5];

  if (!product) {
    return null;
  }

  return (
    <PageCornerEffect>
      <article className={styles.page6}>
        <Page6Meta label="№ 6" content={product.name} />
        <Page6Media src={product.image} alt={product.name} />
        <Page6Sku value={product.sku} />
        <Page6Copy title={product.title} description={product.description} />
        <p className={styles.pageNumber}>06</p>
      </article>
    </PageCornerEffect>
  );
};
