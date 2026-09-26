import type { FC } from 'react';
import clsx from 'clsx';
import { splitDescription } from '@utils/splitDescription';
import styles from './Copy.module.scss';

type CopyProps = {
  description: string | string[];
  className?: string;
};

export const Copy: FC<CopyProps> = ({ description, className }) => (
  <div className={clsx(styles.copy, className)}>
    {splitDescription(description).map((paragraph) => (
      <p key={paragraph} className={styles.paragraph}>
        {paragraph}
      </p>
    ))}
  </div>
);
