import type { FC } from 'react';
import { STAGE2 } from '@/data';
import { Live } from './components';
// import { Copy, Live, Media, Meta, Title } from './components';
// import styles from './Page13.module.scss';

export const Page13: FC = () => {
  const product = STAGE2[2];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <article className={styles.page13}>
        <Meta content={product.name} />
        <Media
          src={product.image}
          extraSrc={product.extraImage}
          alt={`${product.title.replace('\n', ' ')}, ${product.name}`}
        />
        <Title title={product.title} />
        <Copy
          description={product.description}
          highlight={product.highlight}
          extraHighlight={product.extraHighlight}
          extraDescription={product.extraDescription}
        />
        {product.watermark ? (
          <p className={styles.watermark}>{product.watermark}</p>
        ) : null}
        <p className={styles.pageNumber}>03</p>
        <Live productName={product.name} points={product.points} />
      </article>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
