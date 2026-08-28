import type { FC } from 'react';
import clsx from 'clsx';
import styles from './BookControls.module.scss';
import { BOOK_COPY } from '../../mock';

type BookControlsProps = {
  currentPage: number;
  pageCount: number;
  cornerFolded: boolean;
  canFoldCorner: boolean;
  onSelectPage: (pageIndex: number) => void;
  onToggleCornerFold: () => void;
};

const getTickLabel = (index: number, pageCount: number) => {
  if (index === 0) {
    return BOOK_COPY.cover;
  }

  if (index === pageCount - 1) {
    return BOOK_COPY.backCover;
  }

  return `${BOOK_COPY.pageLabel} ${index}`;
};

export const BookControls: FC<BookControlsProps> = ({
  currentPage,
  pageCount,
  cornerFolded,
  canFoldCorner,
  onSelectPage,
  onToggleCornerFold,
}) => (
  <nav className={styles.root} aria-label={BOOK_COPY.pageNav}>
    <ol className={styles.scale}>
      {Array.from({ length: pageCount }, (_, index) => (
        <li key={index} className={styles.item}>
          <button
            type="button"
            className={clsx(styles.tick, {
              [styles.tickActive]: index === currentPage,
            })}
            aria-label={getTickLabel(index, pageCount)}
            aria-current={index === currentPage ? 'page' : undefined}
            onClick={() => onSelectPage(index)}
          />
        </li>
      ))}
    </ol>
    <p className={styles.status} aria-live="polite">
      {getTickLabel(currentPage, pageCount)}
    </p>
    <button
      type="button"
      className={clsx(styles.foldCorner, {
        [styles.foldCornerActive]: cornerFolded,
      })}
      aria-pressed={cornerFolded}
      disabled={!canFoldCorner}
      onClick={onToggleCornerFold}
    >
      {cornerFolded ? BOOK_COPY.unfoldCorner : BOOK_COPY.foldCorner}
    </button>
  </nav>
);
