import type { FC } from 'react';
import { PAGES } from '@/data/pages';
import { Live } from '../Page1/components';
// import { PageCornerEffect } from '@components/Feature';
// import { Copy, Media, Meta, Sku } from './components';
// import styles from './Page9.module.scss';

export const Page9: FC = () => {
  const product = PAGES[8];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <PageCornerEffect>
        <article className={styles.page9}>
          <Meta label="№ 9" content={product.name} />
          <Media src={product.image} alt={product.name} />
          <Sku value={product.sku} />
          <Copy title={product.title} description={product.description} />
          <p className={styles.pageNumber}>09</p>
        </article>
      </PageCornerEffect>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
