import type { FC } from 'react';
import clsx from 'clsx';
import styles from './CatalogCta.module.scss';

type CatalogCtaProps = {
  href: string;
  label: string;
  className?: string;
};

export const CatalogCta: FC<CatalogCtaProps> = ({ href, label, className }) => (
  <a
    className={clsx(styles.root, className)}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    data-book-hit
    onClick={(event) => event.stopPropagation()}
  >
    {label}
  </a>
);
