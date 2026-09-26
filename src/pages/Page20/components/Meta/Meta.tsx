import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Meta.module.scss';

type MetaProps = {
  content?: string;
  className?: string;
};

export const Meta: FC<MetaProps> = ({ content, className }) => {
  if (!content) {
    return null;
  }

  return (
    <header className={clsx(styles.meta, className)}>
      {content.split('\n').map((line) => (
        <p key={line} className={styles.content}>
          {line}
        </p>
      ))}
    </header>
  );
};
