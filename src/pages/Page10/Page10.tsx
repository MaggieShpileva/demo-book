import type { FC } from 'react';
import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Page10Copy } from './components/Page10Copy';
import { Page10Media } from './components/Page10Media';
import { Page10Meta } from './components/Page10Meta';
import { Page10Sku } from './components/Page10Sku';
import styles from './Page10.module.scss';

export const Page10: FC = () => {
  const product = PAGES[9];

  if (!product) {
    return null;
  }

  return (
    <PageCornerEffect>
      <article className={styles.page10}>
        <Page10Meta label="№ 10" content={product.name} />
        <Page10Media src={product.image} alt={product.name} />
        <Page10Sku value={product.sku} />
        <Page10Copy title={product.title} description={product.description} />
        <p className={styles.pageNumber}>10</p>
      </article>
    </PageCornerEffect>
  );
};
