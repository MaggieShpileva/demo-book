import type { FC } from 'react';
import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Page2Copy } from './components/Page2Copy';
import { Page2Media } from './components/Page2Media';
import { Page2Meta } from './components/Page2Meta';
import { Page2Sku } from './components/Page2Sku';
import styles from './Page2.module.scss';

export const Page2: FC = () => {
  const product = PAGES[1];

  if (!product) {
    return null;
  }

  return (
    <PageCornerEffect>
      <article className={styles.page2}>
        <Page2Meta label="№ 2" content={product.name} />
        <Page2Media src={product.image} alt={product.name} />
        <Page2Sku value={product.sku} />
        <Page2Copy title={product.title} description={product.description} />
        <p className={styles.pageNumber}>02</p>
      </article>
    </PageCornerEffect>
  );
};
