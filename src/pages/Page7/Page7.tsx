import type { FC } from 'react';
import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Page7Copy } from './components/Page7Copy';
import { Page7Media } from './components/Page7Media';
import { Page7Meta } from './components/Page7Meta';
import { Page7Sku } from './components/Page7Sku';
import styles from './Page7.module.scss';

export const Page7: FC = () => {
  const product = PAGES[6];

  if (!product) {
    return null;
  }

  return (
    <PageCornerEffect>
      <article className={styles.page7}>
        <Page7Meta label="№ 7" content={product.name} />
        <Page7Media src={product.image} alt={product.name} />
        <Page7Sku value={product.sku} />
        <Page7Copy title={product.title} description={product.description} />
        <p className={styles.pageNumber}>07</p>
      </article>
    </PageCornerEffect>
  );
};
