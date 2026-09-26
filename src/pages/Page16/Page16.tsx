import type { FC } from 'react';
import { STAGE2 } from '@/data';
import { Live } from './components';
// import { Copy, Live, Media, Meta, Title } from './components';
// import styles from './Page16.module.scss';

export const Page16: FC = () => {
  const product = STAGE2[5];

  if (!product) {
    return null;
  }

  return (
    <>
      {/*
      <article className={styles.page16}>
        <Meta content={product.name} />
        <Media
          src={product.image}
          alt={`${product.title.replace('\n', ' ')}, ${product.name.replaceAll('\n', ' ')}`}
        />
        <Title title={product.title} />
        <Copy
          description={product.description}
          highlight={product.highlight}
        />
        <p className={styles.pageNumber}>06</p>
        <Live productName={product.name} points={product.points} />
      </article>
      */}
      <Live productName={product.name} points={product.points} />
    </>
  );
};
