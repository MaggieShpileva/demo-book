import type { FC } from 'react';
import { STAGE2 } from '@/data';
import { Live } from './components';
// import { Copy, Live, Media, Meta, Title } from './components';
// import styles from './Page17.module.scss';

export const Page17: FC = () => {
  const product = STAGE2[6];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <article className={styles.page17}>
        <Meta content={product.name} />
        <Media
          src={product.image}
          extraSrc={product.extraImage}
          alt={`${product.title.replace('\n', ' ')}, ${product.name.replace('\n', ' ')}`}
        />
        <Title title={product.title} />
        <Copy
          description={product.description}
          highlight={product.highlight}
        />
        <p className={styles.pageNumber}>07</p>
        <Live productName={product.name} points={product.points} />
      </article>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
