import type { FC } from 'react';
import styles from './BookControls.module.scss';
import { BOOK_COPY } from '../../mock';

type BookControlsProps = {
  currentPage: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
};

export const BookControls: FC<BookControlsProps> = ({
  currentPage,
  pageCount,
  onPrev,
  onNext,
}) => {
  const displayPage = Math.min(currentPage + 1, pageCount);

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.button}
        onClick={onPrev}
        disabled={currentPage <= 0}
        aria-label={BOOK_COPY.prev}
      >
        {BOOK_COPY.prev}
      </button>
      <p className={styles.status} aria-live="polite">
        {BOOK_COPY.pageLabel} {displayPage} / {pageCount}
      </p>
      <button
        type="button"
        className={styles.button}
        onClick={onNext}
        disabled={currentPage >= pageCount - 1}
        aria-label={BOOK_COPY.next}
      >
        {BOOK_COPY.next}
      </button>
    </div>
  );
};
