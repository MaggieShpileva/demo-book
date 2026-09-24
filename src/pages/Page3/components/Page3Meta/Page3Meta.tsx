import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Page3Meta.module.scss';

type Page3MetaProps = {
  label?: string;
  content?: string;
  className?: string;
};

export const Page3Meta: FC<Page3MetaProps> = ({
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
