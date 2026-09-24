import type { FC } from 'react';
import clsx from 'clsx';
import { CTA_LABEL } from '@/constants/catalog';
import type { ProductProps } from '@/types/product';
import { splitDescription } from '@utils/splitDescription';
import { ProductHeader } from '../ProductHeader';
import { Template04Content } from './components/Template04Content';
import { Template04Footer } from './components/Template04Footer';
import { Template04Media } from './components/Template04Media';
import styles from './Template04.module.scss';

type Template04Props = ProductProps & {
  className?: string;
};

export const Template04: FC<Template04Props> = ({
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
      <Template04Content paragraphs={splitDescription(description)} />
      <Template04Media
        images={images}
        imageAlt={name}
        badgeText={attributes[0]?.value ?? ''}
      />
    </div>
    <Template04Footer title={name} href={purchaseUrl} ctaLabel={CTA_LABEL} />
  </article>
);
