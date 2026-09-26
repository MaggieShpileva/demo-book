import type { FC } from 'react';
import { STAGE2 } from '@/data';
import { Live } from './components';
// import { Copy, Live, Media, Meta, Title } from './components';
// import styles from './Page19.module.scss';

export const Page19: FC = () => {
  const product = STAGE2[8];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <article className={styles.page19}>
        <Meta content={product.name} />
        <Media
          src={product.image}
          caption={product.watermark}
          alt={`${product.title.replace('\n', ' ')}, ${product.name}`}
        />
        <Title title={product.title} />
        <Copy description={product.description} />
        <p className={styles.pageNumber}>09</p>
        <Live productName={product.name} points={product.points} />
      </article>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
