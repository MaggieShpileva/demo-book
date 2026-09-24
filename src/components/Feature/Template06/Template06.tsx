import type { FC } from 'react';
import clsx from 'clsx';
import { CTA_LABEL } from '@/constants/catalog';
import type { ProductProps } from '@/types/product';
import { Title } from '@components/UI';
import { splitDescription } from '@utils/splitDescription';
import { stackTitle } from '@utils/stackTitle';
import { ProductHeader } from '../ProductHeader';
import { Template06Content } from './components/Template06Content';
import { Template06Footer } from './components/Template06Footer';
import { Template06Media } from './components/Template06Media';
import styles from './Template06.module.scss';

type Template06Props = ProductProps & {
  className?: string;
};

const STACKED_PLACEHOLDER = 'ЗАГО\nЛО\nВОК';

export const Template06: FC<Template06Props> = ({
  itemId,
  name,
  description,
  images,
  purchaseUrl,
  className,
}) => (
  <article className={clsx(styles.root, className)}>
    <ProductHeader itemId={itemId} />
    <Title as="h1" size="displayXl" className={styles.title}>
      {stackTitle(name, STACKED_PLACEHOLDER)}
    </Title>
    <div className={styles.main}>
      <Template06Content paragraphs={splitDescription(description)} />
      <Template06Media imageSrc={images[0]} imageAlt={name} />
    </div>
    <Template06Footer href={purchaseUrl} ctaLabel={CTA_LABEL} />
  </article>
);
