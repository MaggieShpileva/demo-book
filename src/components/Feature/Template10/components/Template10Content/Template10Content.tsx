import type { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@components/UI';
import styles from './Template10Content.module.scss';

type Template10ContentProps = {
  leftParagraphs: string[];
  rightParagraphs: string[];
  className?: string;
};

export const Template10Content: FC<Template10ContentProps> = ({
  leftParagraphs,
  rightParagraphs,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    <div className={styles.column}>
      {leftParagraphs.map((paragraph) => (
        <Typography key={paragraph.slice(0, 48)} size="body">
          {paragraph}
        </Typography>
      ))}
    </div>
    <div className={clsx(styles.column, styles.columnRight)}>
      {rightParagraphs.map((paragraph) => (
        <Typography key={`right-${paragraph.slice(0, 48)}`} size="body">
          {paragraph}
        </Typography>
      ))}
    </div>
  </div>
);
