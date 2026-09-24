import type { FC } from 'react';
import clsx from 'clsx';
import { Title, Typography } from '@components/UI';
import styles from './Template03Content.module.scss';

type Template03ContentProps = {
  title: string;
  paragraphs: string[];
  className?: string;
};

export const Template03Content: FC<Template03ContentProps> = ({
  title,
  paragraphs,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    <Title>{title}</Title>
    <div className={styles.body}>
      {paragraphs.map((paragraph) => (
        <Typography key={paragraph} size="body">
          {paragraph}
        </Typography>
      ))}
    </div>
  </div>
);
