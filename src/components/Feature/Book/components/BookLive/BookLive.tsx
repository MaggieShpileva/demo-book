import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './BookLive.module.scss';

type BookLiveProps = {
  children: ReactNode;
  className?: string;
};

/** Marks interactive live UI; fade is handled by `PageLiveOverlay`. */
export const BookLive: FC<BookLiveProps> = ({ children, className }) => (
  <div className={clsx(styles.root, className)} data-book-live>
    {children}
  </div>
);
