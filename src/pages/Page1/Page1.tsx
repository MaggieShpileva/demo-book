import type { FC } from 'react';
import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Page1Copy } from './components/Page1Copy';
import { Page1Live } from './components/Page1Live';
import { Page1Media } from './components/Page1Media';
import { Page1Meta } from './components/Page1Meta';
import { Page1Sku } from './components/Page1Sku';
import styles from './Page1.module.scss';

export const Page1: FC = () => {
  const product = PAGES[0];

  if (!product) {
    return null;
  }

  return (
    <PageCornerEffect>
      <article className={styles.page1}>
        <Page1Meta label="№ 1" content={product.name} />
        <Page1Media src={product.image} alt={product.name} />
        <Page1Sku value={product.sku} />
        <Page1Copy title={product.title} description={product.description} />
        <p className={styles.pageNumber}>01</p>
        <Page1Live productName={product.name} points={product.points} />
      </article>
    </PageCornerEffect>
  );
};
