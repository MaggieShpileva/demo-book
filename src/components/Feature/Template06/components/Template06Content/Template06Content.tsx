import type { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@components/UI';
import styles from './Template06Content.module.scss';

type Template06ContentProps = {
  paragraphs: string[];
  className?: string;
};

export const Template06Content: FC<Template06ContentProps> = ({
  paragraphs,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    {paragraphs.map((paragraph) => (
      <Typography
        key={paragraph.slice(0, 48)}
        size="body"
        className={styles.preLine}
      >
        {paragraph}
      </Typography>
    ))}
  </div>
);
