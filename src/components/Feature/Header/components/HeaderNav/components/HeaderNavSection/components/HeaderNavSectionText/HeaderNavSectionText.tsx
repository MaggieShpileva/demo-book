import type { FC } from 'react';
import clsx from 'clsx';
import styles from '../../HeaderNavSection.module.scss';

type HeaderNavSectionTextProps = {
  tone: 'white' | 'black';
  label?: string;
  progress?: string;
};

export const HeaderNavSectionText: FC<HeaderNavSectionTextProps> = ({
  tone,
  label,
  progress,
}) => (
  <span
    className={clsx(styles.textRow, {
      [styles.textRowWhite]: tone === 'white',
      [styles.textRowBlack]: tone === 'black',
    })}
    aria-hidden
  >
    {label != null ? <span className={styles.title}>{label}</span> : null}
    {progress != null ? (
      <span className={styles.progress}>{progress}</span>
    ) : null}
  </span>
);
