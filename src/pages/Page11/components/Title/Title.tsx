import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Title.module.scss';

type TitleProps = {
  title: string;
  className?: string;
};

export const Title: FC<TitleProps> = ({ title, className }) => {
  const [brand, product] = title.split('\n');

  if (!brand) {
    return null;
  }

  return (
    <div className={clsx(styles.title, className)}>
      <div className={styles.brandWrap}>
        <p className={styles.brand}>{brand}</p>
      </div>
      {product ? (
        <div className={styles.productWrap}>
          <p className={styles.product}>{product}</p>
        </div>
      ) : null}
    </div>
  );
};
