import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page6Meta.module.scss';

type Page6MetaProps = {
  label?: string;
  content?: string;
  className?: string;
};

export const Page6Meta: FC<Page6MetaProps> = ({
  label,
  content,
  className,
}) => {
  if (!label && !content) {
    return null;
  }

  return (
    <header className={clsx(styles.root, className)}>
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
