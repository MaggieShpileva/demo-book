import type { FC } from 'react';
import clsx from 'clsx';
import { CTA_LABEL } from '@/constants/catalog';
import type { ProductProps } from '@/types/product';
import { splitDescription } from '@utils/splitDescription';
import { stackTitle } from '@utils/stackTitle';
import { Template08Content } from './components/Template08Content';
import { Template08Footer } from './components/Template08Footer';
import { Template08Header } from './components/Template08Header';
import { Template08Media } from './components/Template08Media';
import { Template08Specs } from './components/Template08Specs';
import styles from './Template08.module.scss';

type Template08Props = ProductProps & {
  className?: string;
};

export const Template08: FC<Template08Props> = ({
  itemId,
  name,
  brand,
  description,
  images,
  purchaseUrl,
  attributes,
  className,
}) => (
  <article className={clsx(styles.root, className)}>
    <Template08Header brand={brand} name={name} />
    <p className={styles.itemId}>{itemId}</p>
    <Template08Specs
      items={attributes.map((item) => item.value)}
      href={purchaseUrl}
      ctaLabel={CTA_LABEL}
    />
    <Template08Media imageSrc={images[0]} imageAlt={name} />
    <Template08Content
      title={stackTitle(name)}
      paragraphs={splitDescription(description)}
    />
    <Template08Footer />
  </article>
);
