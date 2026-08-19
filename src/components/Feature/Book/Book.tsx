import { useRef, useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import { BookControls } from './components/BookControls';
import { FlipBook } from './components/FlipBook';
import { BOOK_COPY, BOOK_PAGES } from './mock';
import styles from './Book.module.scss';

type BookProps = {
  className?: string;
};

type FlipBookHandle = {
  pageFlip: () => {
    flipPrev: () => void;
    flipNext: () => void;
  };
};

export const Book: FC<BookProps> = ({ className }) => {
  const bookRef = useRef<FlipBookHandle>(null);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section
      className={clsx(styles.root, className)}
      aria-labelledby="book-title"
    >
      <header className={styles.header}>
        <h1 id="book-title" className={styles.title}>
          {BOOK_COPY.title}
        </h1>
        <p className={styles.hint}>{BOOK_COPY.hint}</p>
      </header>

      <div className={styles.stage}>
        <FlipBook ref={bookRef} onFlip={setCurrentPage} />
      </div>

      <BookControls
        currentPage={currentPage}
        pageCount={BOOK_PAGES.length}
        onPrev={() => bookRef.current?.pageFlip().flipPrev()}
        onNext={() => bookRef.current?.pageFlip().flipNext()}
      />
    </section>
  );
};
