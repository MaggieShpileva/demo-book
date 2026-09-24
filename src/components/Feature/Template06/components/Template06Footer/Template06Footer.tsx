import type { FC } from 'react';
import clsx from 'clsx';
import { CatalogCta } from '@components/UI';
import styles from './Template06Footer.module.scss';

type Template06FooterProps = {
  href: string;
  ctaLabel: string;
  className?: string;
};

export const Template06Footer: FC<Template06FooterProps> = ({
  href,
  ctaLabel,
  className,
}) => (
  <footer className={clsx(styles.root, className)}>
    <CatalogCta href={href} label={ctaLabel} />
    <p className={styles.slideNumber}>01</p>
  </footer>
);
