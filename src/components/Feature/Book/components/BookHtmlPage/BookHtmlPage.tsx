import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { SINGLE_PAGE_MAX_WIDTH } from '@components/Feature/Book/constants';
import styles from './BookHtmlPage.module.scss';

type BookHtmlPageProps = {
  pageNumber?: number;
  side?: 'left' | 'right';
  children?: ReactNode;
};

const isSinglePageViewport = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(`(max-width: ${SINGLE_PAGE_MAX_WIDTH - 1}px)`).matches;

export const BookHtmlPage: FC<BookHtmlPageProps> = ({
  pageNumber,
  side: sideProp,
  children,
}) => {
  const side = isSinglePageViewport()
    ? 'right'
    : (sideProp ??
      (pageNumber != null
        ? pageNumber % 2 === 1
          ? 'left'
          : 'right'
        : undefined));

  return (
    <article className={styles.root}>
      {side != null && (
        <div
          className={clsx(styles.edge, {
            [styles.edgeLeft]: side === 'left',
            [styles.edgeRight]: side === 'right',
          })}
          aria-hidden
        />
      )}
      {children}
    </article>
  );
};
