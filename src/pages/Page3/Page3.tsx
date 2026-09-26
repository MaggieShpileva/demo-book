import type { FC } from 'react';
import { PAGES } from '@/data/pages';
import { Live } from './components';
// import { PageCornerEffect } from '@components/Feature';
// import { Copy, Media, Meta, Sku } from './components';
// import styles from './Page3.module.scss';

export const Page3: FC = () => {
  const product = PAGES[2];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <PageCornerEffect>
        <article className={styles.page3}>
          <Meta label="№ 3" content={product.name} />
          <Media src={product.image} alt={product.name} />
          <Sku value={product.sku} />
          <Copy title={product.title} description={product.description} />
          <p className={styles.pageNumber}>03</p>
        </article>
      </PageCornerEffect>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
