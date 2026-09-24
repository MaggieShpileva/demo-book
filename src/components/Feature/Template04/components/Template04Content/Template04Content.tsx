import type { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@components/UI';
import styles from './Template04Content.module.scss';

type Template04ContentProps = {
  paragraphs: string[];
  className?: string;
};

export const Template04Content: FC<Template04ContentProps> = ({
  paragraphs,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    {paragraphs.map((paragraph) => (
      <Typography key={paragraph} size="body">
        {paragraph}
      </Typography>
    ))}
  </div>
);
