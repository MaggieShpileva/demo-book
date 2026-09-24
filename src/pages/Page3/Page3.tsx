import type { FC } from 'react';
import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Page3Copy } from './components/Page3Copy';
import { Page3Media } from './components/Page3Media';
import { Page3Meta } from './components/Page3Meta';
import { Page3Sku } from './components/Page3Sku';
import styles from './Page3.module.scss';

export const Page3: FC = () => {
  const product = PAGES[2];

  if (!product) {
    return null;
  }

  return (
    <PageCornerEffect>
      <article className={styles.page3}>
        <Page3Meta label="№ 3" content={product.name} />
        <Page3Media src={product.image} alt={product.name} />
        <Page3Sku value={product.sku} />
        <Page3Copy title={product.title} description={product.description} />
        <p className={styles.pageNumber}>03</p>
      </article>
    </PageCornerEffect>
  );
};
