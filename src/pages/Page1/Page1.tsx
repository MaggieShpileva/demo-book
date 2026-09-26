import type { FC } from 'react';
// import { PageCornerEffect } from '@components/Feature';
import { PAGES } from '@/data/pages';
import { Live } from './components';
// import { Copy, Live, Media, Meta, Sku } from './components';
// import styles from './Page1.module.scss';

export const Page1: FC = () => {
  const product = PAGES[0];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <PageCornerEffect>
        <article className={styles.page1}>
          <Meta label="№ 1" content={product.name} />
          <Media src={product.image} alt={product.name} />
          <Sku value={product.sku} />
          <Copy title={product.title} description={product.description} />
          <p className={styles.pageNumber}>01</p>
          <Live productName={product.name} points={product.points} />
        </article>
      </PageCornerEffect>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
