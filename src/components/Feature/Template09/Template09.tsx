import type { FC } from 'react';
import clsx from 'clsx';
import { CTA_LABEL } from '@/constants/catalog';
import type { ProductProps } from '@/types/product';
import { splitDescription } from '@utils/splitDescription';
import { stackTitle } from '@utils/stackTitle';
import { ProductHeader } from '../ProductHeader';
import { Template09Content } from './components/Template09Content';
import { Template09Footer } from './components/Template09Footer';
import { Template09Media } from './components/Template09Media';
import { Template09Title } from './components/Template09Title';
import styles from './Template09.module.scss';

type Template09Props = ProductProps & {
  className?: string;
};

export const Template09: FC<Template09Props> = ({
  itemId,
  name,
  description,
  images,
  purchaseUrl,
  className,
}) => (
  <article className={clsx(styles.root, className)}>
    <ProductHeader itemId={itemId} />
    <Template09Title title={stackTitle(name)} />
    <Template09Media imageSrc={images[0]} imageAlt={name} />
    <Template09Content
      paragraphs={splitDescription(description)}
      href={purchaseUrl}
      ctaLabel={CTA_LABEL}
    />
    <Template09Footer />
  </article>
);
