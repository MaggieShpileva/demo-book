import type { FC } from 'react';
import clsx from 'clsx';
import { CTA_LABEL } from '@/constants/catalog';
import type { ProductProps } from '@/types/product';
import { splitDescription } from '@utils/splitDescription';
import { ProductHeader } from '../ProductHeader';
import { Template02Content } from './components/Template02Content';
import { Template02Footer } from './components/Template02Footer';
import { Template02Media } from './components/Template02Media';
import styles from './Template02.module.scss';

type Template02Props = ProductProps & {
  className?: string;
};

export const Template02: FC<Template02Props> = ({
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
      <Template02Media imageSrc={images[0]} imageAlt={name} />
      <Template02Content
        title={name}
        paragraphs={splitDescription(description)}
        href={purchaseUrl}
        ctaLabel={CTA_LABEL}
      />
    </div>
    <div className={styles.footer}>
      <Template02Footer
        benefitsText={attributes.map((item) => item.value).join(', ')}
      />
    </div>
  </article>
);
