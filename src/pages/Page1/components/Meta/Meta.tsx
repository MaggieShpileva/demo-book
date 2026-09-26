import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Meta.module.scss';

type MetaProps = {
  label?: string;
  content?: string;
  className?: string;
};

export const Meta: FC<MetaProps> = ({
  label,
  content,
  className,
}) => {
  if (!label && !content) {
    return null;
  }

  return (
    <header className={clsx(styles.meta, className)}>
      {label ? <p className={styles.label}>{label}</p> : null}
      {label && content ? (
        <p className={styles.separator} aria-hidden="true">
          |
        </p>
      ) : null}
      {content ? <p className={styles.content}>{content}</p> : null}
    </header>
  );
};
