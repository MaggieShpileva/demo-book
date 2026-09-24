import type { FC } from 'react';
import clsx from 'clsx';
import { Title, Typography } from '@components/UI';
import styles from './Template08Content.module.scss';

type Template08ContentProps = {
  title: string;
  paragraphs: string[];
  className?: string;
};

export const Template08Content: FC<Template08ContentProps> = ({
  title,
  paragraphs,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    <Title as="h1" size="xlarge" className={styles.title}>
      {title}
    </Title>
    <div className={styles.body}>
      {paragraphs.map((paragraph) => (
        <Typography key={paragraph.slice(0, 48)} size="body">
          {paragraph}
        </Typography>
      ))}
    </div>
  </div>
);
