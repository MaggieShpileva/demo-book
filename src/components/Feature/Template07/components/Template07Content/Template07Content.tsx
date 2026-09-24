import type { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@components/UI';
import styles from './Template07Content.module.scss';

type Template07ContentProps = {
  paragraphs: string[];
  className?: string;
};

export const Template07Content: FC<Template07ContentProps> = ({
  paragraphs,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    {paragraphs.map((paragraph) => (
      <Typography key={paragraph.slice(0, 48)} size="body">
        {paragraph}
      </Typography>
    ))}
  </div>
);
