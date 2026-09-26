import type { FC } from 'react';
import { STAGE2 } from '@/data';
import { Live } from './components';
// import { PageCornerEffect } from '@components/Feature';
// import { Copy, Live, Media, Meta, Title } from './components';
// import styles from './Page11.module.scss';

export const Page11: FC = () => {
  const product = STAGE2[0];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <article className={styles.page11}>
        <Meta content={product.name} />
        <Media
          src={product.image}
          alt={`${product.title.replace('\n', ' ')}, ${product.name}`}
        />
        <Title title={product.title} />
        <Copy
          description={product.description}
          highlight={product.highlight}
        />
        <p className={styles.pageNumber}>01</p>
        <Live productName={product.name} points={product.points} />
      </article>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
