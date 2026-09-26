import type { FC } from 'react';
import { STAGE2 } from '@/data';
import { Live } from './components';
// import { PageCornerEffect } from '@components/Feature';
// import { Copy, Live, Media, Meta, Title } from './components';
// import styles from './Page12.module.scss';

export const Page12: FC = () => {
  const product = STAGE2[1];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <article className={styles.page12}>
        <Meta content={product.name} />
        <Media
          src={product.image}
          alt={`${product.title.replace('\n', ' ')}, ${product.name.replace('\n', ' ')}`}
        />
        <Title title={product.title} />
        <Copy
          description={product.description}
          highlight={product.highlight}
        />
        <p className={styles.pageNumber}>02</p>
        <Live productName={product.name} points={product.points} />
      </article>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
