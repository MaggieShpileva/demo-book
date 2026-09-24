import type { FC } from 'react';
import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Page4Copy } from './components/Page4Copy';
import { Page4Media } from './components/Page4Media';
import { Page4Meta } from './components/Page4Meta';
import { Page4Sku } from './components/Page4Sku';
import styles from './Page4.module.scss';

export const Page4: FC = () => {
  const product = PAGES[3];

  if (!product) {
    return null;
  }

  return (
    <PageCornerEffect>
      <article className={styles.page4}>
        <Page4Meta label="№ 4" content={product.name} />
        <Page4Media src={product.image} alt={product.name} />
        <Page4Sku value={product.sku} />
        <Page4Copy title={product.title} description={product.description} />
        <p className={styles.pageNumber}>04</p>
      </article>
    </PageCornerEffect>
  );
};
