import type { FC } from 'react';
import clsx from 'clsx';
import { BOOK_COPY } from '../../constants';
import styles from './BookControls.module.scss';

type BookControlsProps = {
  page: number;
  sheetCount: number;
  onSelectPage: (page: number) => void;
};

export const BookControls: FC<BookControlsProps> = ({
  page,
  sheetCount,
  onSelectPage,
}) => {
  const stops = sheetCount + 1;

  return (
    <nav className={styles.root} aria-label={BOOK_COPY.pageNav}>
      {Array.from({ length: stops }, (_, index) => (
        <button
          key={index}
          type="button"
          className={clsx(styles.button, {
            [styles.buttonActive]: index === page,
          })}
          aria-current={index === page ? 'page' : undefined}
          onClick={() => onSelectPage(index)}
        >
          {index + 1}
        </button>
      ))}
    </nav>
  );
};
