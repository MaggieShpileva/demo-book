import type { FC } from 'react';
import clsx from 'clsx';
import { splitDescription } from '@utils/splitDescription';
import styles from './Page1Copy.module.scss';

type Page1CopyProps = {
  title: string;
  description: string | string[];
  className?: string;
};

export const Page1Copy: FC<Page1CopyProps> = ({
  title,
  description,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    <h2 className={styles.title}>
      {title.split('\n').map((line) => (
        <span key={line} className={styles.titleLine}>
          {line}
        </span>
      ))}
    </h2>
    <div className={styles.description}>
      {splitDescription(description).map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
  </div>
);
