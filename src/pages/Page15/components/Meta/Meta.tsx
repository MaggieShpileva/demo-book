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
      <p className={styles.content}>{content}</p>
    </header>
  );
};
