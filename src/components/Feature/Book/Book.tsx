import type { FC } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { BookControls } from './components/BookControls';
import { BookLoader } from './components/BookLoader';
import { FlipBook } from './components/FlipBook';
import {
  cornerFoldAtom,
  pageAtom,
} from './components/FlipBook/components/UI';
import { bookPages } from './components/FlipBook/components/Book/htmlPages';
import { buildBookSheets } from './components/FlipBook/components/Book/utils/buildBookSheets';
import { useBookTexturesReady } from './components/FlipBook/hooks/useBookTexturesReady';
import { useSinglePageBook } from './components/FlipBook/hooks/useSinglePageBook';
import { BOOK_COPY } from './mock';
import styles from './Book.module.scss';

type BookProps = {
  className?: string;
};

export const Book: FC<BookProps> = ({ className }) => {
  const [currentPage, setCurrentPage] = useAtom(pageAtom);
  const [cornerFolded, setCornerFolded] = useAtom(cornerFoldAtom);
  const isReady = useBookTexturesReady();
  const singlePage = useSinglePageBook();
  const sheets = buildBookSheets(bookPages, singlePage);
  const pageCount = singlePage ? sheets.length : sheets.length + 1;
  const canFoldCorner = currentPage < sheets.length;

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, pageCount - 1));
  }, [pageCount, setCurrentPage]);

  useEffect(() => {
    setCornerFolded(false);
  }, [currentPage, setCornerFolded]);

  const handleSelectPage = (pageIndex: number) => {
    setCornerFolded(false);
    setCurrentPage(pageIndex);
  };

  return (
    <section
      className={clsx(styles.root, className)}
      aria-label={BOOK_COPY.title}
    >
      <div className={styles.stage}>
        {isReady ? <FlipBook onFlip={setCurrentPage} /> : <BookLoader />}
      </div>

      {isReady ? (
        <BookControls
          currentPage={currentPage}
          pageCount={pageCount}
          cornerFolded={cornerFolded}
          canFoldCorner={canFoldCorner}
          onSelectPage={handleSelectPage}
          onToggleCornerFold={() => setCornerFolded((folded) => !folded)}
        />
      ) : null}
    </section>
  );
};
