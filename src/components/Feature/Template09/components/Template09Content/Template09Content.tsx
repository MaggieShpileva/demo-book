import type { FC } from 'react';
import clsx from 'clsx';
import { CatalogCta, Typography } from '@components/UI';
import styles from './Template09Content.module.scss';

type Template09ContentProps = {
  paragraphs: string[];
  href: string;
  ctaLabel: string;
  className?: string;
};

export const Template09Content: FC<Template09ContentProps> = ({
  paragraphs,
  href,
  ctaLabel,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    <div className={styles.body}>
      {paragraphs.map((paragraph) => (
        <Typography key={paragraph.slice(0, 48)} size="body">
          {paragraph}
        </Typography>
      ))}
    </div>
    <CatalogCta href={href} label={ctaLabel} />
  </div>
);
