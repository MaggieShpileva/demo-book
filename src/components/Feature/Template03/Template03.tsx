import type { FC } from 'react';
import clsx from 'clsx';
import { CTA_LABEL } from '@/constants/catalog';
import type { ProductProps } from '@/types/product';
import { CatalogCta } from '@components/UI';
import { splitDescription } from '@utils/splitDescription';
import { ProductHeader } from '../ProductHeader';
import { Template03Content } from './components/Template03Content';
import { Template03Footer } from './components/Template03Footer';
import { Template03Intro } from './components/Template03Intro';
import { Template03Media } from './components/Template03Media';
import styles from './Template03.module.scss';

type Template03Props = ProductProps & {
  className?: string;
};

export const Template03: FC<Template03Props> = ({
  itemId,
  name,
  description,
  images,
  purchaseUrl,
  attributes,
  className,
}) => (
  <article className={clsx(styles.root, className)}>
    <ProductHeader itemId={itemId} />
    <div className={styles.main}>
      <Template03Intro badgeText={attributes[0]?.value ?? ''} />
      <Template03Media imageSrc={images[0]} imageAlt={name} />
      <div className={styles.cta}>
        <CatalogCta href={purchaseUrl} label={CTA_LABEL} />
      </div>
      <div className={styles.bottom}>
        <Template03Content
          title={name}
          paragraphs={splitDescription(description)}
        />
        <Template03Footer />
      </div>
    </div>
  </article>
);
