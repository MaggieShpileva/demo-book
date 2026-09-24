import type { FC } from 'react';
import clsx from 'clsx';
import { CatalogCta, Title } from '@components/UI';
import styles from './Template04Footer.module.scss';

type Template04FooterProps = {
  title: string;
  href: string;
  ctaLabel: string;
  className?: string;
};

export const Template04Footer: FC<Template04FooterProps> = ({
  title,
  href,
  ctaLabel,
  className,
}) => (
  <footer className={clsx(styles.root, className)}>
    <Title size="medium" className={styles.title}>
      {title}
    </Title>
    <CatalogCta className={styles.cta} href={href} label={ctaLabel} />
    <p className={styles.slideNumber}>01</p>
  </footer>
);
