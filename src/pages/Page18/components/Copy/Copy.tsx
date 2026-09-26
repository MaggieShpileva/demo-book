import type { FC } from 'react';
import clsx from 'clsx';
import { splitDescription } from '@utils/splitDescription';
import styles from './Copy.module.scss';

type CopyProps = {
  description: string | string[];
  highlight: string;
  className?: string;
};

export const Copy: FC<CopyProps> = ({
  description,
  highlight,
  className,
}) => (
  <div className={clsx(styles.copy, className)}>
    {highlight ? <p className={styles.highlight}>{highlight}</p> : null}
    <p className={styles.lead}>{splitDescription(description).join(' ')}</p>
  </div>
);
