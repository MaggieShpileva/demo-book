import type { FC } from 'react';
import clsx from 'clsx';
import { CTA_LABEL } from '@/constants/catalog';
import type { ProductAttribute, ProductProps } from '@/types/product';
import { CatalogCta, Title } from '@components/UI';
import { ProductHeader } from '../ProductHeader';
import { Template05Content } from './components/Template05Content';
import { Template05Footer } from './components/Template05Footer';
import { Template05Media } from './components/Template05Media';
import styles from './Template05.module.scss';

type Template05Props = ProductProps & {
  className?: string;
};

const SKIN_TYPE_KEY = 'skinType';

const getSkinType = (attributes: ProductAttribute[]): string =>
  attributes.find((item) => item.key === SKIN_TYPE_KEY)?.value ?? '';

const getColumns = (attributes: ProductAttribute[]): ProductAttribute[] =>
  attributes.filter((item) => item.key !== SKIN_TYPE_KEY);

export const Template05: FC<Template05Props> = ({
  itemId,
  name,
  images,
  purchaseUrl,
  attributes,
  className,
}) => {
  const skinType = getSkinType(attributes);

  return (
    <article className={clsx(styles.root, className)}>
      <ProductHeader itemId={itemId} />
      <Title as="h1" className={styles.title}>
        {name}
      </Title>
      <Template05Media
        className={styles.media}
        imageSrc={images[0]}
        imageAlt={name}
      />
      <div className={styles.actions}>
        <CatalogCta href={purchaseUrl} label={CTA_LABEL} />
        {skinType ? <p className={styles.skinType}>{skinType}</p> : null}
      </div>
      <Template05Content columns={getColumns(attributes)} />
      <Template05Footer />
    </article>
  );
};
