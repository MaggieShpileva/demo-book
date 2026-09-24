import type { FC } from 'react';
import clsx from 'clsx';
import { CatalogCta } from '@components/UI';
import styles from './Template10Footer.module.scss';

type Template10FooterProps = {
  href: string;
  ctaLabel: string;
  className?: string;
};

export const Template10Footer: FC<Template10FooterProps> = ({
  href,
  ctaLabel,
  className,
}) => (
  <footer className={clsx(styles.root, className)}>
    <CatalogCta className={styles.cta} href={href} label={ctaLabel} />
    <p className={styles.slideNumber}>01</p>
  </footer>
);
