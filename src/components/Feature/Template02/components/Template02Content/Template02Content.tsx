import type { FC } from 'react';
import clsx from 'clsx';
import { CatalogCta, Title, Typography } from '@components/UI';
import styles from './Template02Content.module.scss';

type Template02ContentProps = {
  title: string;
  paragraphs: string[];
  href: string;
  ctaLabel: string;
  className?: string;
};

export const Template02Content: FC<Template02ContentProps> = ({
  title,
  paragraphs,
  href,
  ctaLabel,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    <Title className={styles.title} size="large">
      {title}
    </Title>
    <div className={styles.body}>
      <div className={styles.textBlock}>
        {paragraphs.map((paragraph) => (
          <Typography key={paragraph} size="body">
            {paragraph}
          </Typography>
        ))}
      </div>
      <CatalogCta className={styles.cta} href={href} label={ctaLabel} />
    </div>
  </div>
);
