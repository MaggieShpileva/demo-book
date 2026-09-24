import type { FC } from 'react';
import clsx from 'clsx';
import WEBP_TEMPLATE01_BOTTLE from '@assets/images/template01/product-bottle.webp';
import WEBP_TEMPLATE04_BOTTLE from '@assets/images/template06/product-bottle.webp';
import WEBP_TEMPLATE07_BOTTLE from '@assets/images/template07/product-bottle.webp';
import { ScrollTriggeredCard } from './components/ScrollTriggeredCard';
import styles from './ScrollTriggeredAnimation.module.scss';

const DEMO_ITEMS = [
  {
    id: 'template01',
    bottleSrc: WEBP_TEMPLATE01_BOTTLE,
    bottleAlt: 'Сыворотка Double Serum',
  },
  {
    id: 'template04',
    bottleSrc: WEBP_TEMPLATE04_BOTTLE,
    bottleAlt: 'Сыворотка Double Serum',
  },
  {
    id: 'template07',
    bottleSrc: WEBP_TEMPLATE07_BOTTLE,
    bottleAlt: 'Product bottle',
  },
] as const;

type ScrollTriggeredAnimationProps = {
  className?: string;
};

export const ScrollTriggeredAnimation: FC<ScrollTriggeredAnimationProps> = ({
  className,
}) => (
  <section className={clsx(styles.root, className)}>
    <ul className={styles.list}>
      {DEMO_ITEMS.map((item) => (
        <li key={item.id}>
          <ScrollTriggeredCard
            bottleSrc={item.bottleSrc}
            bottleAlt={item.bottleAlt}
          />
        </li>
      ))}
    </ul>
  </section>
);
