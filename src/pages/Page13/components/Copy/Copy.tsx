import type { FC } from 'react';
import clsx from 'clsx';
import { splitDescription } from '@utils/splitDescription';
import styles from './Copy.module.scss';

type CopyProps = {
  description: string | string[];
  highlight: string;
  extraHighlight?: string;
  extraDescription?: string;
  className?: string;
};

export const Copy: FC<CopyProps> = ({
  description,
  highlight,
  extraHighlight,
  extraDescription,
  className,
}) => (
  <div className={clsx(styles.copy, className)}>
    <div className={styles.lead}>
      <p className={styles.highlight}>{highlight}</p>
      {splitDescription(description).map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </div>
    {extraHighlight || extraDescription ? (
      <div className={styles.alt}>
        {extraHighlight ? (
          <p className={styles.highlight}>{extraHighlight}</p>
        ) : null}
        {extraDescription
          ? splitDescription(extraDescription).map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))
          : null}
      </div>
    ) : null}
  </div>
);
