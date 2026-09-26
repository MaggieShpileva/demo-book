import type { FC } from 'react';
import { PAGES } from '@/data/pages';
import { Live } from './components';
// import { PageCornerEffect } from '@components/Feature';
// import { Copy, Media, Meta, Sku } from './components';
// import styles from './Page4.module.scss';

export const Page4: FC = () => {
  const product = PAGES[3];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <PageCornerEffect>
        <article className={styles.page4}>
          <Meta label="№ 4" content={product.name} />
          <Media src={product.image} alt={product.name} />
          <Sku value={product.sku} />
          <Copy title={product.title} description={product.description} />
          <p className={styles.pageNumber}>04</p>
        </article>
      </PageCornerEffect>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
