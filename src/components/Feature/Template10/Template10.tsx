import type { FC } from 'react';
import clsx from 'clsx';
import { CTA_LABEL } from '@/constants/catalog';
import type { ProductProps } from '@/types/product';
import { splitDescription } from '@utils/splitDescription';
import { stackTitle } from '@utils/stackTitle';
import { ProductHeader } from '../ProductHeader';
import { Template10Content } from './components/Template10Content';
import { Template10Footer } from './components/Template10Footer';
import { Template10Intro } from './components/Template10Intro';
import { Template10Media } from './components/Template10Media';
import { Template10Specs } from './components/Template10Specs';
import styles from './Template10.module.scss';

type Template10Props = ProductProps & {
  className?: string;
};

export const Template10: FC<Template10Props> = ({
  itemId,
  name,
  description,
  images,
  purchaseUrl,
  attributes,
  className,
}) => {
  const paragraphs = splitDescription(description);
  const leftParagraphs = paragraphs.slice(0, 2);
  const rightParagraphs = paragraphs.slice(1, 3);

  return (
    <article className={clsx(styles.root, className)}>
      <ProductHeader itemId={itemId} />
      <div className={styles.stage}>
        <Template10Media imageSrc={images[0]} imageAlt={name} />
        <Template10Intro title={stackTitle(name)} />
        <Template10Content
          leftParagraphs={leftParagraphs}
          rightParagraphs={rightParagraphs}
        />
        <Template10Specs items={attributes.map((item) => item.value)} />
        <Template10Footer href={purchaseUrl} ctaLabel={CTA_LABEL} />
      </div>
    </article>
  );
};
