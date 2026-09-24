import type { FC } from 'react';
import clsx from 'clsx';
import { CTA_LABEL } from '@/constants/catalog';
import type { ProductAttribute, ProductProps } from '@/types/product';
import { CatalogCta } from '@components/UI';
import { splitDescription } from '@utils/splitDescription';
import { stackTitle } from '@utils/stackTitle';
import { ProductHeader } from '../ProductHeader';
import { Template07Content } from './components/Template07Content';
import { Template07Footer } from './components/Template07Footer';
import { Template07Intro } from './components/Template07Intro';
import { Template07Media } from './components/Template07Media';
import styles from './Template07.module.scss';

type Template07Props = ProductProps & {
  className?: string;
};

const SPF_KEY = 'spf';

const getSpfLabel = (attributes: ProductAttribute[]): string =>
  attributes.find((item) => item.key === SPF_KEY)?.value ?? '';

export const Template07: FC<Template07Props> = ({
  itemId,
  name,
  description,
  images,
  purchaseUrl,
  attributes,
  className,
}) => (
  <article className={clsx(styles.root, className)}>
    <ProductHeader className={styles.header} itemId={itemId} />
    <div className={styles.cta}>
      <CatalogCta href={purchaseUrl} label={CTA_LABEL} />
    </div>
    <div className={styles.stage}>
      <Template07Intro
        title={stackTitle(name)}
        badgeText={getSpfLabel(attributes)}
      />
      <Template07Media
        bottleSrc={images[0]}
        detailSrc={images[1]}
        imageAlt={name}
      />
      <Template07Content paragraphs={splitDescription(description)} />
      <Template07Footer />
    </div>
  </article>
);
