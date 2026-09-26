import type { FC } from 'react';
import clsx from 'clsx';
import { splitDescription } from '@utils/splitDescription';
import styles from './Copy.module.scss';

type CopyProps = {
  title: string;
  description: string | string[];
  className?: string;
};

export const Copy: FC<CopyProps> = ({
  title,
  description,
  className,
}) => (
  <div className={clsx(styles.copy, className)}>
    <div className={styles.description}>
      {splitDescription(description).map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
    <h2 className={styles.title}>
      {title.split('\n').map((line) => (
        <span key={line} className={styles.titleLine}>
          {line}
        </span>
      ))}
    </h2>
  </div>
);
