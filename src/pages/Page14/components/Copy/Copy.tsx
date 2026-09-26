import type { FC } from 'react';
import clsx from 'clsx';
import { splitDescription } from '@utils/splitDescription';
import styles from './Copy.module.scss';

type CopyProps = {
  description: string | string[];
  highlight: string;
  extraDescription?: string;
  className?: string;
};

export const Copy: FC<CopyProps> = ({
  description,
  highlight,
  extraDescription,
  className,
}) => (
  <div className={clsx(styles.copy, className)}>
    <p className={styles.lead}>
      {splitDescription(description).join(' ')}{' '}
      <span className={styles.highlight}>{highlight}</span>
    </p>
    {extraDescription ? (
      <p className={styles.aside}>{extraDescription}</p>
    ) : null}
  </div>
);
