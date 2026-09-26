import type { FC } from 'react';
import { STAGE2 } from '@/data';
import { Live } from './components';
// import { Copy, Details, Live, Media, Meta, Title } from './components';
// import styles from './Page15.module.scss';

export const Page15: FC = () => {
  const product = STAGE2[4];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <article className={styles.page15}>
        <Meta content={product.name} />
        <Media
          src={product.image}
          startLabel={product.watermark}
          endLabel={product.sideLabel}
          alt={`${product.title.replace('\n', ' ')}, ${product.name}`}
        />
        <Title title={product.title} />
        <Copy description={product.description} />
        <Details
          extraSrc={product.extraImage}
          detailSrc={product.detailImage}
          caption={product.caption}
          alt={`${product.title.replace('\n', ' ')}, ${product.name}`}
        />
        <p className={styles.pageNumber}>05</p>
        <Live productName={product.name} points={product.points} />
      </article>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
