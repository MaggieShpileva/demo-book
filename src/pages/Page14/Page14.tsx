import type { FC } from 'react';
import { STAGE2 } from '@/data';
import { Live } from './components';
// import { Copy, Live, Media, Meta, Title } from './components';
// import styles from './Page14.module.scss';

export const Page14: FC = () => {
  const product = STAGE2[3];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <article className={styles.page14}>
        <Meta content={product.name} />
        <Media
          src={product.image}
          extraSrc={product.extraImage}
          detailSrc={product.detailImage}
          label={product.watermark}
          alt={`${product.title.replace('\n', ' ')}, ${product.name}`}
        />
        <Title title={product.title} />
        <Copy
          description={product.description}
          highlight={product.highlight}
          extraDescription={product.extraDescription}
        />
        <p className={styles.pageNumber}>04</p>
        <Live productName={product.name} points={product.points} />
      </article>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
