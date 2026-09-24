import type { FC } from 'react';
import clsx from 'clsx';
import { CatalogCta } from '@components/UI';
import styles from './Template08Specs.module.scss';

type Template08SpecsProps = {
  items: string[];
  href: string;
  ctaLabel: string;
  className?: string;
};

export const Template08Specs: FC<Template08SpecsProps> = ({
  items,
  href,
  ctaLabel,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
    <div className={styles.cta}>
      <CatalogCta href={href} label={ctaLabel} />
    </div>
  </div>
);
